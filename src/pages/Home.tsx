
import React from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';
import HomeFooter from '@/components/home/HomeFooter';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
      <HomeFooter />
    </div>
  );
};

export default Home;
