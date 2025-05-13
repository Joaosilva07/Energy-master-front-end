
// Simulated smart home energy consumption dataset based on Kaggle datasets
// References: 
// - https://www.kaggle.com/datasets/adilshamim8/smart-home-energy-consumption
// - https://www.kaggle.com/datasets/mexwell/smart-home-energy-consumption

export interface DeviceModel {
  id: string;
  manufacturer: string;
  model: string;
  type: string;
  averageConsumption: number;
  standbyConsumption: number;
  energyClass: string;
  yearReleased?: number;
}

// Dataset of common device models
export const deviceModels: DeviceModel[] = [
  // Air Conditioners
  { id: "ac-01", manufacturer: "Samsung", model: "WindFree", type: "ac", averageConsumption: 1200, standbyConsumption: 3.2, energyClass: "A++" },
  { id: "ac-02", manufacturer: "LG", model: "DualCool", type: "ac", averageConsumption: 950, standbyConsumption: 2.8, energyClass: "A++" },
  { id: "ac-03", manufacturer: "Daikin", model: "Sensira", type: "ac", averageConsumption: 850, standbyConsumption: 2.5, energyClass: "A+++" },
  
  // Refrigerators
  { id: "ref-01", manufacturer: "Electrolux", model: "FrostFree", type: "refrigerator", averageConsumption: 45, standbyConsumption: 45, energyClass: "A+" },
  { id: "ref-02", manufacturer: "Brastemp", model: "BRM54", type: "refrigerator", averageConsumption: 50, standbyConsumption: 50, energyClass: "A" },
  { id: "ref-03", manufacturer: "Consul", model: "CRM50", type: "refrigerator", averageConsumption: 47, standbyConsumption: 47, energyClass: "A" },
  
  // TVs
  { id: "tv-01", manufacturer: "Samsung", model: "Crystal UHD", type: "tv", averageConsumption: 120, standbyConsumption: 0.5, energyClass: "A+" },
  { id: "tv-02", manufacturer: "LG", model: "NanoCell", type: "tv", averageConsumption: 130, standbyConsumption: 0.6, energyClass: "A+" },
  { id: "tv-03", manufacturer: "Sony", model: "Bravia", type: "tv", averageConsumption: 140, standbyConsumption: 0.7, energyClass: "A" },
  
  // Computers
  { id: "pc-01", manufacturer: "Dell", model: "Inspiron", type: "computer", averageConsumption: 150, standbyConsumption: 2, energyClass: "B" },
  { id: "pc-02", manufacturer: "HP", model: "Pavilion", type: "computer", averageConsumption: 160, standbyConsumption: 2.2, energyClass: "B" },
  { id: "pc-03", manufacturer: "Lenovo", model: "ThinkPad", type: "computer", averageConsumption: 140, standbyConsumption: 1.8, energyClass: "A" },
  
  // Washing Machines
  { id: "wash-01", manufacturer: "Electrolux", model: "Premium", type: "washer", averageConsumption: 200, standbyConsumption: 1, energyClass: "A++" },
  { id: "wash-02", manufacturer: "Brastemp", model: "BWL09", type: "washer", averageConsumption: 210, standbyConsumption: 1.1, energyClass: "A+" },
  
  // Microwaves
  { id: "mic-01", manufacturer: "Electrolux", model: "MI41", type: "microwave", averageConsumption: 1200, standbyConsumption: 3, energyClass: "A" },
  { id: "mic-02", manufacturer: "Brastemp", model: "BMS45", type: "microwave", averageConsumption: 1300, standbyConsumption: 3.2, energyClass: "B" }
];

// Function to search device models
export const searchDeviceModels = (query: string): DeviceModel[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return deviceModels;
  
  return deviceModels.filter(device => 
    device.manufacturer.toLowerCase().includes(normalizedQuery) ||
    device.model.toLowerCase().includes(normalizedQuery) ||
    device.type.toLowerCase().includes(normalizedQuery) ||
    device.energyClass.toLowerCase().includes(normalizedQuery)
  );
};

// Get recommended device models by type for energy savings
export const getRecommendedModels = (type: string): DeviceModel[] => {
  return deviceModels
    .filter(device => device.type === type && device.energyClass.includes("A"))
    .sort((a, b) => a.averageConsumption - b.averageConsumption)
    .slice(0, 3);
};
