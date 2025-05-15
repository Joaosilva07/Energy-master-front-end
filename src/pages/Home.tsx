
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '@/components/home/HomeHeader';
import HeroSection from '@/components/home/HeroSection';
import HomeFooter from '@/components/home/HomeFooter';
import { useUser } from '@/contexts/UserContext';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Redirect logged-in users to the user home page
  useEffect(() => {
    if (user) {
      navigate('/user-home');
    }
  }, [user, navigate]);

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
