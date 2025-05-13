
import { supabase } from '@/lib/supabase';
import { Device } from '@/types/device.types';

// Format a device from Supabase response to our Device type
export const formatDeviceFromSupabase = (item: any): Device => ({
  id: item.id,
  name: item.name,
  type: item.type,
  consumption: item.consumption,
  status: item.status,
  lastActivity: item.lastActivity,
  powerState: item.powerState,
  location: item.location,
  userId: item.user_id,
  // Add timestamp for when device was turned on
  activatedAt: item.activatedAt || (item.powerState ? new Date().toISOString() : null)
});

// Save devices to localStorage as backup
export const saveDevicesToLocalStorage = (userId: string, devices: Device[]) => {
  localStorage.setItem(`devices_${userId}`, JSON.stringify(devices));
};

// Load devices from localStorage
export const loadDevicesFromLocalStorage = (userId: string): Device[] => {
  const savedDevices = localStorage.getItem(`devices_${userId}`);
  return savedDevices ? JSON.parse(savedDevices) : [];
};

// Fetch devices from Supabase
export const fetchDevicesFromSupabase = async (userId: string) => {
  return await supabase
    .from('devices')
    .select('*')
    .eq('user_id', userId);
};

// Add a device to Supabase
export const addDeviceToSupabase = async (device: Omit<Device, 'id'>) => {
  return await supabase
    .from('devices')
    .insert({
      name: device.name,
      type: device.type,
      consumption: device.consumption,
      status: device.status,
      lastActivity: device.lastActivity,
      powerState: device.powerState,
      location: device.location || 'Casa',
      user_id: device.userId,
      activatedAt: device.powerState ? new Date().toISOString() : null
    })
    .select('*')
    .single();
};

// Update a device in Supabase
export const updateDeviceInSupabase = async (id: string, userId: string, updates: Partial<Device>) => {
  // If turning the device on, add the activation timestamp
  const updatesToSubmit = { ...updates };
  if (updates.powerState === true) {
    updatesToSubmit.activatedAt = new Date().toISOString();
  } else if (updates.powerState === false) {
    updatesToSubmit.activatedAt = null;
  }
  
  return await supabase
    .from('devices')
    .update(updatesToSubmit)
    .eq('id', id)
    .eq('user_id', userId);
};

// Remove a device from Supabase
export const removeDeviceFromSupabase = async (id: string, userId: string) => {
  return await supabase
    .from('devices')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
};

// Calculate device active time based on the activation timestamp
export const calculateActiveTime = (device: Device): { hours: number, minutes: number } | null => {
  // If device is not powered on or doesn't have an activation timestamp, return null
  if (!device.powerState || !device.activatedAt) return null;
  
  // Calculate the difference between now and when the device was turned on
  const now = new Date();
  const activatedAt = new Date(device.activatedAt);
  const diffInMs = now.getTime() - activatedAt.getTime();
  
  // Convert milliseconds to hours and minutes
  const totalMinutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return { hours, minutes };
};

// Calculate current consumption based on device specs and actual active time
export const calculateCurrentConsumption = (device: Device, activeTime: { hours: number, minutes: number } | null): number | null => {
  if (!device.powerState || !activeTime) return null;
  
  // Calculate hourly consumption rate (kWh)
  // Monthly consumption divided by 30 days and 24 hours to get hourly rate
  const hourlyConsumption = device.consumption / (30 * 24);
  
  // Calculate total hours of active time
  const totalHours = activeTime.hours + (activeTime.minutes / 60);
  
  // Current consumption is hourly rate multiplied by active hours
  const currentConsumption = hourlyConsumption * totalHours;
  
  // Return with 2 decimal places for readability
  return parseFloat(currentConsumption.toFixed(2));
};
