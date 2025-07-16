import React, { useState } from 'react';
import { FaLinkedin, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'consulenza',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting || isSuccess) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'contact'
        }),
      });

      // Controlla se la risposta è OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Controlla se la risposta è JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('La risposta del server non è in formato JSON');
      }

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        
        // Reset form dopo 3 secondi
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: 'consulenza',
            message: ''
          });
          setIsSuccess(false);
        }, 3000);
      } else {
        alert('Errore nell\'invio del messaggio. Riprova più tardi.');
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nell\'invio del messaggio. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className={styles.contactSection} id="contatti">
      <div className={styles.container}>
        <h2 className={`section-title ${styles.sectionTitle}`}>Contatti e Collaborazioni</h2>
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h3>Vuoi un consiglio personalizzato?</h3>
            <p>Compila il modulo per richiedere:</p>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>Consulenze private sui tuoi progetti</li>
              <li className={styles.contactItem}>Collaborazioni con la tua azienda</li>
              <li className={styles.contactItem}>Proposte professionali</li>
            </ul>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#" className={styles.socialLink} aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <div className={styles.formContainer}>
            {isSuccess ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Messaggio Inviato con Successo!</h3>
                <p>Ti ricontatterò presto. Grazie per avermi contattato!</p>
              </div>
            ) : (
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="name">Nome e Cognome</label>
                  <input
                    className={styles.formInput}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="email">Email</label>
                  <input
                    className={styles.formInput}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="subject">Oggetto</label>
                  <select
                    className={styles.formSelect}
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    <option value="consulenza">Consulenza Privata</option>
                    <option value="collaborazione">Collaborazione Aziendale</option>
                    <option value="proposta">Proposta Professionale</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="message">Messaggio</label>
                  <textarea
                    className={styles.formTextarea}
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Invio in corso...' : 'Invia Messaggio'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 