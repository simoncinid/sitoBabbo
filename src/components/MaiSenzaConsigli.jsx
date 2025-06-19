import React, { useState, useEffect, useRef } from 'react';
import styles from './MaiSenzaConsigli.module.css';

const MaiSenzaConsigli = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const videos = [
    {
      id: 1,
      title: 'Impermeabilizzazione Terrazzo',
      duration: '12:45',
      thumbnail: '/assets/video-placeholder-1.svg'
    },
    {
      id: 2,
      title: 'Tecniche di Applicazione',
      duration: '18:30',
      thumbnail: '/assets/video-placeholder-2.svg'
    },
    {
      id: 3,
      title: 'Manutenzione Preventiva',
      duration: '15:20',
      thumbnail: '/assets/video-placeholder-3.svg'
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
          <h2 className={styles.sectionTitle}>Mai Senza Consigli</h2>
          <p className={styles.sectionDescription}>
            Guide pratiche e video tutorial per trasformare ogni progetto di impermeabilizzazione 
            in un successo garantito. Scopri le tecniche professionali che fanno la differenza.
          </p>
        </div>

        {/* Videos Grid - Desktop */}
        <div className={styles.videosGrid}>
          {videos.map((video) => (
            <div key={video.id} className={styles.videoCard}>
              <div className={styles.videoThumbnail}>
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className={styles.thumbnailImage}
                />
                <div className={styles.playButton}>
                  <span className={styles.playIcon}>▶</span>
                </div>
                <div className={styles.videoDuration}>{video.duration}</div>
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
                  <img 
                    src={videos[currentVideoIndex].thumbnail} 
                    alt={videos[currentVideoIndex].title}
                    className={styles.thumbnailImage}
                  />
                  <div className={styles.playButton}>
                    <span className={styles.playIcon}>▶</span>
                  </div>
                  <div className={styles.videoDuration}>{videos[currentVideoIndex].duration}</div>
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
    </section>
  );
};

export default MaiSenzaConsigli;