import React, { useState, useEffect, useRef } from 'react';
import styles from './MaiSenzaConsigli.module.css';

const MaiSenzaConsigli = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenVideoIndex, setFullscreenVideoIndex] = useState(0);
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const fullscreenVideoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Avvia autoplay dei video quando la sezione è visibile
          if (!isFullscreen) {
            videoRefs.current.forEach(video => {
              if (video) {
                video.play().catch(e => console.log('Autoplay prevented:', e));
              }
            });
          }
        } else {
          // Pausa i video quando la sezione non è visibile
          if (!isFullscreen) {
            videoRefs.current.forEach(video => {
              if (video) {
                video.pause();
              }
            });
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isFullscreen]);

  const openFullscreen = (videoIndex) => {
    setFullscreenVideoIndex(videoIndex);
    setIsFullscreen(true);
    // Pausa tutti i video normali
    videoRefs.current.forEach(video => {
      if (video) video.pause();
    });
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
  };

  const nextFullscreenVideo = () => {
    setFullscreenVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevFullscreenVideo = () => {
    setFullscreenVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Gestione tasti freccia per fullscreen
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isFullscreen) {
        if (e.key === 'ArrowRight') nextFullscreenVideo();
        if (e.key === 'ArrowLeft') prevFullscreenVideo();
        if (e.key === 'Escape') closeFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  const videos = [
    {
      id: 1,
      title: 'Impermeabilizzazione Terrazzo',
      duration: '12:45',
      videoSrc: '/assets/video1.mp4'
    },
    {
      id: 2,
      title: 'Tecniche di Applicazione',
      duration: '18:30',
      videoSrc: '/assets/video2.mp4'
    },
    {
      id: 3,
      title: 'Cura Preventiva',
      duration: '15:20',
      videoSrc: '/assets/video3.mp4'
    }
  ];

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section 
      ref={sectionRef}
      className={`${styles.consigliContainer} ${isVisible ? styles.visible : ''}`} 
      id="mai-senza-consigli"
    >
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>Mai Senza Conoscenza</h2>
          <h4 className={styles.sectionSubtitle}>
            Perchè chi sa, sceglie meglio
          </h4>
          <p className={styles.sectionDescription}>
            Ogni superficie ha le sue regole, ogni prodotto ha i suoi limiti e ogni lavoro ha bisogno di una preparazione precisa.
            <br /><br />
            🎯 Qui comprenderai il perché, prima di acquistare, è opportuno conoscere:
            <br /><br />
            • Come leggere una scheda tecnica<br />
            • Cosa significano i valori come SRI, elasticità, consumo<br />
            • Come si prepara una superficie davvero pronta all'applicazione<br />
            • Quando, se e come usare un primer<br />
            • Come evitare gli errori più frequenti
            <br /><br />
            📽️ Video pratici, guide passo-passo e spiegazioni chiare: così anche un appassionato può fare un lavoro da vero professionista.
            <br /><br />
            ---
            <br /><br />
            👉 <strong>Hai un dubbio?</strong>
            <br /><br />
            🔘 Prima di acquistare Se non sai, <a
              href="https://wa.me/393938675606?text=Ciao! Ho un dubbio prima di acquistare"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#4CAF50',
                fontWeight: 'bold',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              chiedi qua
            </a>
          </p>
        </div>

        {/* Videos Grid - Desktop */}
        <div className={styles.videosGrid}>
          {videos.map((video, index) => (
            <div key={video.id} className={styles.videoCard}>
              <div className={styles.videoThumbnail}>
                <video 
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={video.videoSrc}
                  className={styles.thumbnailImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
                <button 
                  className={styles.fullscreenButton}
                  onClick={() => openFullscreen(index)}
                  aria-label="Visualizza a schermo intero"
                >
                  ⛶
                </button>
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Video Gallery - Mobile */}
        <div className={styles.videoGallery}>
          <div className={styles.galleryContainer}>
            <button 
              className={styles.galleryNav + ' ' + styles.navPrev}
              onClick={prevVideo}
              aria-label="Video precedente"
            >
              ‹
            </button>
            
            <div className={styles.gallerySlide}>
              <div className={styles.videoCard}>
                <div className={styles.videoThumbnail}>
                  <video 
                    ref={(el) => {
                      videoRefs.current[currentVideoIndex] = el;
                    }}
                    src={videos[currentVideoIndex].videoSrc}
                    className={styles.thumbnailImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                  <button 
                    className={styles.fullscreenButton}
                    onClick={() => openFullscreen(currentVideoIndex)}
                    aria-label="Visualizza a schermo intero"
                  >
                    ⛶
                  </button>
                </div>
                <div className={styles.videoInfo}>
                  <h3 className={styles.videoTitle}>{videos[currentVideoIndex].title}</h3>
                </div>
              </div>
            </div>
            
            <button 
              className={styles.galleryNav + ' ' + styles.navNext}
              onClick={nextVideo}
              aria-label="Video successivo"
            >
              ›
            </button>
          </div>
          
          <div className={styles.galleryDots}>
            {videos.map((_, index) => (
              <button
                key={index}
                className={`${styles.galleryDot} ${index === currentVideoIndex ? styles.active : ''}`}
                onClick={() => setCurrentVideoIndex(index)}
                aria-label={`Vai al video ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {isFullscreen && (
        <div className={styles.fullscreenModal}>
          <div className={styles.fullscreenContent}>
            <button 
              className={styles.closeButton}
              onClick={closeFullscreen}
              aria-label="Chiudi"
            >
              ✕
            </button>
            
            <button 
              className={styles.fullscreenNav + ' ' + styles.prevButton}
              onClick={prevFullscreenVideo}
              aria-label="Video precedente"
            >
              ‹
            </button>
            
            <video 
              ref={fullscreenVideoRef}
              src={videos[fullscreenVideoIndex].videoSrc}
              className={styles.fullscreenVideo}
              controls
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
            
            <button 
              className={styles.fullscreenNav + ' ' + styles.nextButton}
              onClick={nextFullscreenVideo}
              aria-label="Video successivo"
            >
              ›
            </button>
            
            <div className={styles.fullscreenInfo}>
              <h3 className={styles.fullscreenTitle}>{videos[fullscreenVideoIndex].title}</h3>
              <div className={styles.videoCounter}>
                {fullscreenVideoIndex + 1} / {videos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MaiSenzaConsigli;