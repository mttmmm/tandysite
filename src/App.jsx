import React from 'react';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Portfolio from './components/sections/Portfolio';
import About from './components/sections/About';
import Schedule from './components/sections/Schedule';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import ScrollBackdrop from './components/ui/ScrollBackdrop';
import WhatsAppButton from './components/ui/WhatsAppButton';

function App() {
  return (
    <>
      <ScrollBackdrop />
      <Navbar />
      <Hero />
      <Portfolio />
      <About />
      <Schedule />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
