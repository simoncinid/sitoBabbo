import React, { useState } from 'react';
import styles from './Consulenza.module.css';

const Consulenza = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    tipoCliente: 'privato',
    nomeAzienda: '',
    partitaIva: '',
    settoreAttivita: '',
    tipoProgetto: '',
    descrizione: '',
    urgenza: 'normale',
    budget: '',
    citta: '',
    privacy: false,
    newsletter: true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
          formType: 'consultation'
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
        
        // Reset form dopo 4 secondi (più lungo per leggere il messaggio)
        setTimeout(() => {
          setFormData({
            nome: '',
            email: '',
            telefono: '',
            tipoCliente: 'privato',
            nomeAzienda: '',
            partitaIva: '',
            settoreAttivita: '',
            tipoProgetto: '',
            descrizione: '',
            urgenza: 'normale',
            budget: '',
            citta: '',
            privacy: false,
            newsletter: true
          });
          setIsSuccess(false);
        }, 4000);
      } else {
        alert('Errore nell\'invio della richiesta. Riprova più tardi.');
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nell\'invio della richiesta. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.consulenzaSection} id="consulenza">
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>Richiedi Consulenza Gratuita</h2>
          <p className={styles.sectionDescription}>
            Ogni problema di impermeabilizzazione è unico. Ricevi una consulenza personalizzata 
            e non commettere errori costosi. Ti ricontatterò entro 24 ore.
          </p>
        </div>

        {/* Form Section */}
        <div className={styles.formSection}>
          {isSuccess ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h3>Richiesta di Consulenza Inviata!</h3>
              <p>Ti ricontatterò entro 24 ore per discutere del tuo progetto.</p>
              <p><strong>Grazie per la fiducia!</strong></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`${styles.consultForm} ${isSubmitting ? styles.submitting : ''}`}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome e Cognome *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="telefono">Telefono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="citta">Città</label>
                <input
                  type="text"
                  id="citta"
                  name="citta"
                  value={formData.citta}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="tipoCliente">Tipo Cliente *</label>
              <select
                id="tipoCliente"
                name="tipoCliente"
                value={formData.tipoCliente}
                onChange={handleChange}
                required
              >
                <option value="privato">Privato</option>
                <option value="rivenditore">Rivenditore/Applicatore</option>
              </select>
            </div>

            {formData.tipoCliente === 'rivenditore' && (
              <>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="nomeAzienda">Nome Azienda *</label>
                    <input
                      type="text"
                      id="nomeAzienda"
                      name="nomeAzienda"
                      value={formData.nomeAzienda}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="partitaIva">Partita IVA *</label>
                    <input
                      type="text"
                      id="partitaIva"
                      name="partitaIva"
                      value={formData.partitaIva}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="settoreAttivita">Settore di Attività *</label>
                  <select
                    id="settoreAttivita"
                    name="settoreAttivita"
                    value={formData.settoreAttivita}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleziona...</option>
                    <option value="rivenditore-materiali">Rivenditore Materiali Edili</option>
                    <option value="applicatore-impermeabilizzazioni">Applicatore Impermeabilizzazioni</option>
                    <option value="impresa-edile">Impresa Edile</option>
                    <option value="architetto-progettista">Architetto/Progettista</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
              </>
            )}

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="tipoProgetto">Tipo di Progetto *</label>
                <select
                  id="tipoProgetto"
                  name="tipoProgetto"
                  value={formData.tipoProgetto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleziona...</option>
                  <option value="terrazzo">Terrazzo/Balcone</option>
                  <option value="bagno">Bagno</option>
                  <option value="cantina">Cantina/Seminterrato</option>
                  <option value="tetto">Tetto</option>
                  <option value="piscina">Piscina</option>
                  <option value="altro">Altro</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="urgenza">Urgenza</label>
                <select
                  id="urgenza"
                  name="urgenza"
                  value={formData.urgenza}
                  onChange={handleChange}
                >
                  <option value="normale">Normale</option>
                  <option value="urgente">Urgente (entro 1 settimana)</option>
                  <option value="emergenza">Emergenza (infiltrazioni attive)</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="descrizione">Descrizione del Problema *</label>
              <textarea
                id="descrizione"
                name="descrizione"
                value={formData.descrizione}
                onChange={handleChange}
                rows="5"
                placeholder="Descrivi il tuo problema: dove si trova, da quanto tempo, che tipo di infiltrazioni, interventi già tentati, ecc."
                required
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="budget">Budget Indicativo</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              >
                <option value="">Preferisco non specificare</option>
                <option value="under-500">Sotto i 500€</option>
                <option value="500-1000">500€ - 1.000€</option>
                <option value="1000-2500">1.000€ - 2.500€</option>
                <option value="2500-5000">2.500€ - 5.000€</option>
                <option value="over-5000">Oltre 5.000€</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  required
                />
                <span className={styles.checkmark}></span>
                Accetto il trattamento dei dati personali secondo la privacy policy *
              </label>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
                <span className={styles.checkmark}></span>
                Iscrivimi alla newsletter
              </label>
            </div>

            <button 
              type="submit" 
              className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta di Consulenza'}
            </button>
          </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Consulenza; 