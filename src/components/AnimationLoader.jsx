import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import styles from './AnimationLoader.module.css';

const AnimationLoader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationData, setAnimationData] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const lottieRef = useRef(null);
  const hasCompletedRef = useRef(false);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    // Previene ricaricamenti multipli
    if (isPlayingRef.current || hasCompletedRef.current) return;
    
    isPlayingRef.current = true;
    console.log('Caricamento animazione iniziato');
    
    // Carica l'animazione JSON
    fetch('/assets/animazione.json')
      .then(response => response.json())
      .then(data => {
        console.log('Animazione caricata, durata originale:', data.op / data.fr, 'secondi');
        console.log('Con velocità x3 sarà:', (data.op / data.fr) / 3, 'secondi');
        setAnimationData(data);
        
        // Forza la velocità dopo il caricamento
        setTimeout(() => {
          if (lottieRef.current && !hasCompletedRef.current) {
            lottieRef.current.setSpeed(3);
            console.log('Velocità forzata a 3x');
          }
        }, 100);
      })
      .catch(error => {
        console.error('Errore nel caricamento dell\'animazione:', error);
        // Fallback: completa il loading anche se l'animazione non si carica
        setTimeout(() => onComplete(), 1000);
      });
  }, []);

  // Forza la velocità dopo che l'animazione è renderizzata
  useEffect(() => {
    if (animationData && lottieRef.current && !hasCompletedRef.current) {
      const timer = setTimeout(() => {
        if (!hasCompletedRef.current) {
          lottieRef.current.setSpeed(3);
                      console.log('Velocità definitivamente impostata a 3x');
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [animationData]);

  const handleAnimationComplete = () => {
    // Previene multiple chiamate
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    
    console.log('Animazione completata, iniziando fade out');
    setIsFadingOut(true);
    
    // Fade out di 2 secondi poi completa
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 7000);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`${styles.animationLoader} ${isFadingOut ? styles.fadeOut : ''}`}
      style={{ 
        pointerEvents: 'none',
        userSelect: 'none',
        touchAction: 'none'
      }}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Solo l'animazione a schermo intero */}
      {animationData && !hasCompletedRef.current && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={true}
          onComplete={handleAnimationComplete}
          speed={3}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice'
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 10000,
            pointerEvents: 'none',
            userSelect: 'none',
            touchAction: 'none'
          }}
        />
      )}
    </div>
  );
};

export default AnimationLoader; 