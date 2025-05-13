
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
  userId: item.user_id
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
      user_id: device.userId
    })
    .select('*')
    .single();
};

// Update a device in Supabase
export const updateDeviceInSupabase = async (id: string, userId: string, updates: Partial<Device>) => {
  return await supabase
    .from('devices')
    .update(updates)
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
