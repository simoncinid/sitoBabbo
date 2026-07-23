import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import Novita from './components/Novita';
import ArticleDetail from './components/ArticleDetail';
import PrivacyPolicy from './components/PrivacyPolicy';
import TerminiServizio from './components/TerminiServizio';
import CookieBanner from './components/CookieBanner';
import { CookieManager } from './utils/CookieManager';
import './App.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
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
  );
}

function App() {
  useEffect(() => {
    CookieManager.init();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <SEOHead />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/novita" element={<Novita />} />
            <Route path="/novita/:slug" element={<ArticleDetail />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/termini" element={<TerminiServizio />} />
          </Routes>
          <CookieBanner />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
