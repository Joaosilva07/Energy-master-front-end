
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';

const HourlyConsumptionChart = () => {
  const { hourlyData } = useEnergyAnalysis();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Consumo por Hora</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kWh`, 'Consumo']} />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke="#8B5CF6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyConsumptionChart;
