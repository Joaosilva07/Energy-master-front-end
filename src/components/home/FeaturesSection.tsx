
import React from 'react';
import { BarChart3, LightbulbIcon, Target } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Monitoramento em tempo real",
      description: "Acompanhe o consumo de energia dos seus dispositivos em tempo real com gráficos detalhados e relatórios.",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: LightbulbIcon,
      title: "Dicas de economia",
      description: "Receba recomendações personalizadas para economizar energia baseadas no seu padrão de consumo.",
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Target,
      title: "Metas de consumo",
      description: "Estabeleça metas de economia e acompanhe seu progresso com ferramentas intuitivas.",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Recursos principais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconColor={feature.iconColor}
              bgColor={feature.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
