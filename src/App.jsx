import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Novita from './components/Novita';
import ArticleDetail from './components/ArticleDetail';
import AnimationLoader from './components/AnimationLoader';
import CookieBanner from './components/CookieBanner';
import PrivacyPolicy from './components/PrivacyPolicy';
import { CookieManager } from './utils/CookieManager';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inizializza il Cookie Manager
    CookieManager.init();
    
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

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <SEOHead />
          
          {/* Animation Loader - Effetto WOW Professionale */}
          {isLoading && <AnimationLoader onComplete={handleLoadingComplete} />}
          
          {/* Cerchio che segue il cursore - solo desktop */}
          {isDesktop && !isLoading && (
            <div 
              className="cursor-follower"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
            />
          )}
          
          <Routes>
            <Route path="/" element={
              <>
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
              </>
            } />
            <Route path="/novita" element={<Novita />} />
            <Route path="/novita/:slug" element={<ArticleDetail />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
          
          {/* Cookie Banner - Solo dopo l'animazione */}
          {!isLoading && <CookieBanner />}
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App; 