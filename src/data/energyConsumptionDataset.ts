
// Simulated dataset values based on smart home energy consumption patterns
// This simulates data that would come from a real dataset like Kaggle's smart home energy dataset
export const simulatedDataset = {
  // Average consumption patterns by hour (kWh) based on statistical analysis
  hourlyPatterns: [
    0.31, 0.25, 0.22, 0.20, 0.19, 0.23, 
    0.35, 0.58, 0.71, 0.65, 0.60, 0.59, 
    0.58, 0.56, 0.52, 0.54, 0.61, 0.75, 
    0.82, 0.79, 0.71, 0.62, 0.48, 0.38
  ],
  
  // Consumption by day of week (multiplier)
  dayOfWeekFactors: [1.15, 0.95, 0.92, 0.93, 0.96, 1.05, 1.25], // Sun to Sat
  
  // Seasonal variations (multiplier)
  monthlyFactors: [1.21, 1.18, 1.10, 0.96, 0.88, 0.85, 0.87, 0.89, 0.92, 1.03, 1.12, 1.20],
  
  // Device-specific insights derived from dataset analysis
  devicePatterns: {
    ac: { peakFactor: 2.3, offPeakFactor: 0.3, standbyConsumption: 8 },
    refrigerator: { peakFactor: 1.2, offPeakFactor: 0.8, standbyConsumption: 12 },
    tv: { peakFactor: 1.8, offPeakFactor: 0.2, standbyConsumption: 5 },
    computer: { peakFactor: 1.9, offPeakFactor: 0.1, standbyConsumption: 3 },
    lamp: { peakFactor: 1.0, offPeakFactor: 0.0, standbyConsumption: 0 },
    shower: { peakFactor: 2.5, offPeakFactor: 0.0, standbyConsumption: 0 },
    microwave: { peakFactor: 2.2, offPeakFactor: 0.1, standbyConsumption: 2 },
    washer: { peakFactor: 2.0, offPeakFactor: 0.1, standbyConsumption: 3 },
    dryer: { peakFactor: 2.3, offPeakFactor: 0.0, standbyConsumption: 0 },
    iron: { peakFactor: 2.2, offPeakFactor: 0.0, standbyConsumption: 0 },
    dishwasher: { peakFactor: 1.8, offPeakFactor: 0.1, standbyConsumption: 2 },
    waterheater: { peakFactor: 1.9, offPeakFactor: 0.2, standbyConsumption: 5 },
    other: { peakFactor: 1.5, offPeakFactor: 0.2, standbyConsumption: 4 }
  },
  
  // Energy saving potential by device type (percentage)
  savingPotential: {
    ac: 22,
    refrigerator: 15,
    tv: 18,
    computer: 25,
    lamp: 12,
    shower: 30,
    microwave: 10,
    washer: 20,
    dryer: 25,
    iron: 15,
    dishwasher: 18,
    waterheater: 20,
    other: 10
  }
};
