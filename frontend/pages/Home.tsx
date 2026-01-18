
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Rooms from '../components/Rooms';
import PricingTable from '../components/PricingTable';
import Availability from '../components/Availability';
import MonthlyRental from '../components/MonthlyRental';
import Gallery from '../components/Gallery';
import Amenities from '../components/Amenities';
import Location from '../components/Location';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <Rooms />
      <PricingTable />
      <Availability />
      <MonthlyRental />
      <Gallery />
      <Amenities />
      <Location />
    </main>
  );
};

export default Home;
