
import { Device } from '@/types/device.types';
import { HourlyDataPoint, DailyDataPoint, MonthlyDataPoint } from '@/types/energyAnalysis.types';
import { simulatedDataset } from '@/data/energyConsumptionDataset';
import { energyMetricsService } from './energyMetricsService';

export const energyChartService = {
  // Generate hourly consumption data for charts with enhanced dataset patterns
  generateHourlyData(devices: Device[], localDate: Date = new Date()): HourlyDataPoint[] {
    if (!devices || devices.length === 0) return [];
    
    const baseConsumption = energyMetricsService.calculateMetrics(devices, localDate).averageConsumption;
    const currentHour = localDate.getHours();
    
    return Array.from({ length: 24 }, (_, i) => {
      // Use dataset hourly patterns for more realistic consumption
      const hourPattern = simulatedDataset.hourlyPatterns[i];
      
      // Add some randomness for realism
      const randomVariation = 0.9 + Math.random() * 0.2;
      
      // Make current hour value the most accurate
      const hourAdjustment = i === currentHour ? 1 : (Math.abs(i - currentHour) < 3 ? 0.98 : 0.95);
      
      return {
        hour: `${String(i).padStart(2, '0')}:00`,
        consumption: parseFloat((baseConsumption * hourPattern * randomVariation * hourAdjustment).toFixed(2)),
      };
    });
  },

  // Generate daily consumption data for charts with enhanced dataset patterns
  generateDailyData(devices: Device[], localDate: Date = new Date()): DailyDataPoint[] {
    if (!devices || devices.length === 0) return [];
    
    const baseConsumption = energyMetricsService.calculateMetrics(devices, localDate).dailyConsumption;
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const currentDayIdx = localDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    return daysOfWeek.map((day, i) => {
      // Use dataset day-of-week patterns for more realistic consumption
      const dayFactor = simulatedDataset.dayOfWeekFactors[i];
      
      // Add some randomness
      const randomVariation = 0.95 + Math.random() * 0.1;
      
      // Today's consumption is actual, others are predictions
      const isToday = i === currentDayIdx;
      const todayFactor = isToday ? 1 : (i > currentDayIdx ? 0.98 : 1.02); // Slight past/future adjustment
      
      return {
        day,
        consumption: parseFloat((baseConsumption * dayFactor * randomVariation * todayFactor).toFixed(2)),
      };
    });
  },

  // Generate monthly consumption data for charts with enhanced dataset patterns
  generateMonthlyData(devices: Device[], localDate: Date = new Date()): MonthlyDataPoint[] {
    if (!devices || devices.length === 0) return [];
    
    const totalConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentMonth = localDate.getMonth(); // 0 = January, 11 = December
    
    return months.map((month, i) => {
      // Use dataset monthly patterns for more realistic seasonal consumption
      const monthFactor = simulatedDataset.monthlyFactors[i];
      
      // Current month is actual, others are predictions or historical
      const isCurrentMonth = i === currentMonth;
      const monthAdjustment = isCurrentMonth ? 1 : (i > currentMonth ? 0.97 : 1.03); // Past/future adjustment
      
      // Add some randomness
      const randomVariation = 0.95 + Math.random() * 0.1;
      
      return {
        month,
        consumption: parseFloat((totalConsumption * monthFactor * randomVariation * monthAdjustment / 12).toFixed(2)),
      };
    });
  }
};
