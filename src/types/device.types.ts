
// Define all device-related types in a central location
export interface Device {
  id: string;
  name: string;
  type: string;
  consumption: number;
  status: string;
  lastActivity: string;
  powerState: boolean;
  location?: string;
  userId: string;
  activatedAt?: string | null;
}
