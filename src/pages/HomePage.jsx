import React from 'react';
import AppointmentSection from '../components/AppointmentSection';
import ServicesSection from '../components/ServicesSection';
import ReviewsSection from '../components/ReviewsSection';
import LocationSection from '../components/LocationSection';

const HomePage = () => {
  return (
    <>
      <main>
        <AppointmentSection />
        <ServicesSection />
        <ReviewsSection />
        <LocationSection />
      </main>
    </>
  );
};

export default HomePage;
