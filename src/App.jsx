import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MaiSenzaConsigli from './components/MaiSenzaConsigli';
import MaiSenzaManutenzione from './components/MaiSenzaManutenzione';
import MaiSenzaEsperienza from './components/MaiSenzaEsperienza';
import FAQ from './components/FAQ';
import Consulenza from './components/Consulenza';
import Footer from './components/Footer';
import ArticlePage from './components/ArticlePage';
import './App.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <Navbar />
            <Hero />
            <About />
            <MaiSenzaConsigli />
            <MaiSenzaManutenzione />
            <MaiSenzaEsperienza />
            <FAQ />
            <Consulenza />
            <Footer />
          </div>
        } />
        <Route path="/articolo/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App; 