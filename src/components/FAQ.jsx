import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
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

  const faqData = [
    {
      id: 1,
      question: "Posso impermeabilizzare una guaina ardesiata?",
      answer: "Certamente,con le membrane impermeabilizzanti Fibrogum si può impermeabilizzare qualsiasi tipo di guaina ardesiata."
    },
    {
      id: 2,
      question: "Quanto dura un'impermeabilizzazione liquida ben fatta?",
      answer: "Un'impermeabilizzazione eseguita correttamente può durare oltre i 10 anni a seconda del tipo di prodotto utilizzato, della qualità dell'applicazione e della manutenzione."
    },
    {
      id: 3,
      question: "Qual è la differenza principale tra le membrane liquide impermeabilizzanti e le guaine prefabbricate?",
      answer: "Le membrane liquide rappresentano il futuro  dell'impermeabilizzazione  moderna, si applicano a rullo, pennello o airless ,senza bisogno  di fiamme  libere e creano un film continuo senza giunti."
    },
    {
      id: 4,
      question: "Posso fare da solo l'impermeabilizzazione della mia copertura?",
      answer: "Con le membrane impermeabilizzanti Fibrogum ed il mio aiuto potrai riuscire ad avere un risultato da professionista"
    },
    {
      id: 5,
      question: "Ogni quanto controllare l'impermeabilizzazione eseguita?",
      answer: "Mediamente ogni 3 anni deve essere fatto un controllo sulla copertura, se hai utilizzato la tecnica del colore spia,avrai immediatamente l'avviso di una eventuale manutenzione"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className={`${styles.faqContainer} ${isVisible ? styles.visible : ''}`} 
      id="faq"
    >
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>Domande Frequenti</h2>
          <p className={styles.sectionDescription}>
            Risposte alle domande più comuni sull'impermeabilizzazione. 
            Non trovi quello che cerchi? Contattaci per una consulenza personalizzata.
          </p>
        </div>

        {/* FAQ List */}
        <div className={styles.faqSection}>
          <div className={styles.faqList}>
            {faqData.map((faq, index) => (
              <div 
                key={faq.id} 
                className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
              >
                <button 
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <span className={styles.expandIcon}>
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div className={styles.faqAnswer}>
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default FAQ;