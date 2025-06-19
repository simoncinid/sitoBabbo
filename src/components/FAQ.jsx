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
      question: "Quanto dura un'impermeabilizzazione ben fatta?",
      answer: "Un'impermeabilizzazione eseguita correttamente può durare dai 10 ai 25 anni, a seconda del tipo di prodotto utilizzato, della qualità dell'applicazione e della manutenzione."
    },
    {
      id: 2,
      question: "Quali sono i segni che indicano la necessità di impermeabilizzare?",
      answer: "I segnali principali sono: macchie di umidità sui soffitti, muffa negli angoli, distacchi di intonaco, cattivi odori, efflorescenze saline sui muri."
    },
    {
      id: 3,
      question: "Qual è la differenza tra membrane liquide e guaine?",
      answer: "Le membrane liquide si applicano a pennello e creano un film continuo senza giunti. Le guaine sono fogli prefabbricati più adatte per grandi superfici piane."
    },
    {
      id: 4,
      question: "Posso fare da solo l'impermeabilizzazione?",
      answer: "Per piccole superfici è possibile, ma serve conoscenza tecnica. Per superfici importanti è sempre consigliabile affidarsi a professionisti per evitare errori costosi."
    },
    {
      id: 5,
      question: "Quanto costa un intervento di impermeabilizzazione?",
      answer: "I costi variano da €15-30/mq per interventi semplici fino a €50-80/mq per soluzioni complesse. Ogni progetto è unico e richiede un sopralluogo per un preventivo preciso."
    },
    {
      id: 6,
      question: "Ogni quanto controllare l'impermeabilizzazione?",
      answer: "Controllo visivo ogni 3 mesi, controllo approfondito ogni 6 mesi, manutenzione professionale ogni 2-3 anni. La prevenzione costa molto meno delle riparazioni."
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