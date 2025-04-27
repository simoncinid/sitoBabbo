import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Guides from './components/Guides';
import Videos from './components/Videos';
import Tips from './components/Tips';
import Contact from './components/Contact';
import CaseStudy from './components/CaseStudy';
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
            <Guides />
            <Videos />
            <Tips />
            <Contact />
            <CaseStudy />
            <Footer />
          </div>
        } />
        <Route path="/articolo/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App; 