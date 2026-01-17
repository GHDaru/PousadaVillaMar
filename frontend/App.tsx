
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import PricingTable from './components/PricingTable';
import Availability from './components/Availability';
import MonthlyRental from './components/MonthlyRental';
import Tourism from './components/Tourism';
import Gallery from './components/Gallery';
import Amenities from './components/Amenities';
import Location from './components/Location';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <PricingTable />
        <Availability />
        <MonthlyRental />
        <Tourism />
        <Gallery />
        <Amenities />
        <Location />
      </main>
      <Footer />
    </div>
  );
}

export default App;
