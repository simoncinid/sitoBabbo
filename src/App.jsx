import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MaiSenzaConsigli from './components/MaiSenzaConsigli';
import MaiSenzaManutenzione from './components/MaiSenzaManutenzione';
import MaiSenzaEsperienza from './components/MaiSenzaEsperienza';
import FAQ from './components/FAQ';
import Consulenza from './components/Consulenza';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import ArticlePage from './components/ArticlePage';
import './App.css';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Controlla se è desktop
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    // Traccia posizione mouse solo su desktop
    const handleMouseMove = (e) => {
      if (isDesktop) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDesktop]);

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <SEOHead />
          
          {/* Cerchio che segue il cursore - solo desktop */}
          {isDesktop && (
            <div 
              className="cursor-follower"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
            />
          )}
          
          <Navbar />
          <main>
            <Hero />
            <About />
            <MaiSenzaConsigli />
            <MaiSenzaManutenzione />
            <MaiSenzaEsperienza />
            <FAQ />
            <Consulenza />
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App; 