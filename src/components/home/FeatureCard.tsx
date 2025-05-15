
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
}

const FeatureCard = ({ icon: Icon, title, description, iconColor, bgColor }: FeatureCardProps) => {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center mb-2`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
