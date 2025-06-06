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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui si implementerebbe la logica di invio del form
    console.log('Form submitted:', formData);
    alert('Il modulo è stato inviato con successo! (Simulazione)');
    setFormData({
      name: '',
      email: '',
      subject: 'consulenza',
      message: ''
    });
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
                />
              </div>
              
              <button type="submit" className={styles.submitButton}>Invia Messaggio</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 