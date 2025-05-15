
import React from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';
import HomeFooter from '@/components/home/HomeFooter';
import { useUser } from '@/contexts/UserContext';

const Home = () => {
  const { user } = useUser();
  
  // We're removing the auto-redirect to let users visit the home page even when logged in
  // This way they can explicitly navigate to home when they want to

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
