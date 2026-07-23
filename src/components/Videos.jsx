import React, { useState } from 'react';
import styles from './Videos.module.css';

const Videos = () => {
  const [activeCategory, setActiveCategory] = useState('terrazzi');
  
  const categories = [
    { id: 'terrazzi', name: 'Terrazzi' },
    { id: 'tetti', name: 'Tetti' },
    { id: 'box', name: 'Box' },
    { id: 'giardini', name: 'Giardini Pensili' }
  ];
  
  const videos = {
    terrazzi: [
      {
        id: 1,
        title: 'Come preparare il fondo prima dell\'impermeabilizzazione',
        duration: '5:20',
        date: '10/05/2023',
        src: '/assets/video1.mp4'
      },
      {
        id: 2,
        title: 'Applicazione di FibroGum su terrazzo',
        duration: '8:45',
        date: '22/06/2023',
        src: '/assets/video2.mp4'
      },
      {
        id: 3,
        title: '3 errori da evitare nell\'impermeabilizzazione',
        duration: '1:15',
        date: '05/07/2023',
        src: '/assets/video4.mp4'
      }
    ],
    tetti: [
      {
        id: 4,
        title: 'Impermeabilizzazione tetto piano',
        duration: '7:30',
        date: '15/06/2023',
        src: '/assets/video1.mp4'
      },
      {
        id: 5,
        title: 'Come riparare infiltrazioni sul tetto',
        duration: '6:20',
        date: '28/06/2023',
        src: '/assets/video2.mp4'
      }
    ],
    box: [
      {
        id: 6,
        title: 'Impermeabilizzazione box auto',
        duration: '4:45',
        date: '05/06/2023',
        src: '/assets/video4.mp4'
      }
    ],
    giardini: [
      {
        id: 7,
        title: 'Preparazione giardino pensile',
        duration: '9:10',
        date: '20/06/2023',
        src: '/assets/video1.mp4'
      }
    ]
  };
  
  return (
    <section 
      className={styles.videosSection} 
      id="video" 
      style={{ backgroundImage: "url('/assets/hero.png')" }}
    >
      <div className={styles.videosOverlay}></div>
      <div className={styles.container}>
        <h2 className={styles.sectiontitle2}>Video Tutorial</h2>
        
        <div className={styles.videoCategories}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${activeCategory === category.id ? styles.categoryButtonActive : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className={styles.videoGrid}>
          {videos[activeCategory] && videos[activeCategory].map(video => (
            <div className={styles.videoCard} key={video.id}>
              <video
                className={styles.videoMedia}
                src={video.src}
                controls
                playsInline
                preload="metadata"
                aria-label={video.title}
              />
              <div className={styles.videoContent}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.videoMeta}>Durata: {video.duration} | Pubblicato: {video.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
