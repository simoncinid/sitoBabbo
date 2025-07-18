import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyPage}>
      <Navbar />
      
      <main className={styles.privacyMain}>
        <div className={styles.container}>
          <h1 className={styles.privacyTitle}>Privacy Policy e Informativa sui Cookie</h1>
          <p className={styles.lastUpdated}>Ultimo aggiornamento: 19 dicembre 2024</p>

          <div className={styles.content}>
            <h2>1. Titolare del Trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali è <strong>Mauro Simoncini</strong>, 
              con sede in Italia, contattabile tramite email all'indirizzo <strong>simonciniliquiplast@gmail.com</strong> 
              o al numero di telefono <strong>+39 393 8657606</strong>.
            </p>

            <h2>2. Tipologie di Dati Raccolti</h2>
            <p>Il nostro sito web raccoglie le seguenti tipologie di dati:</p>
            <ul>
              <li><strong>Dati di contatto:</strong> nome, cognome, email, numero di telefono (forniti volontariamente tramite i form di contatto)</li>
              <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate, tempo di permanenza (raccolti automaticamente)</li>
              <li><strong>Cookie tecnici:</strong> necessari per il funzionamento del sito</li>
              <li><strong>Cookie analitici:</strong> utilizzati per analizzare il traffico del sito (solo con il tuo consenso)</li>
            </ul>

            <h2>3. Finalità del Trattamento</h2>
            <p>I tuoi dati personali vengono utilizzati per:</p>
            <ul>
              <li>Rispondere alle tue richieste di informazioni e consulenza</li>
              <li>Fornire i servizi richiesti</li>
              <li>Migliorare l'esperienza di navigazione sul sito</li>
              <li>Inviare comunicazioni commerciali (solo se hai dato il consenso)</li>
              <li>Rispettare gli obblighi di legge</li>
            </ul>

            <h2>4. Base Giuridica del Trattamento</h2>
            <p>Il trattamento dei tuoi dati è basato su:</p>
            <ul>
              <li><strong>Consenso esplicito:</strong> per l'invio di comunicazioni commerciali e l'uso di cookie analitici</li>
              <li><strong>Esecuzione di un contratto:</strong> per fornire i servizi richiesti</li>
              <li><strong>Interesse legittimo:</strong> per migliorare i nostri servizi</li>
              <li><strong>Obbligo di legge:</strong> per adempiere agli obblighi normativi</li>
            </ul>

            <h2>5. Conservazione dei Dati</h2>
            <p>I tuoi dati personali saranno conservati per il tempo necessario a:</p>
            <ul>
              <li>Fornire i servizi richiesti</li>
              <li>Rispettare gli obblighi di legge (generalmente 10 anni per i documenti commerciali)</li>
              <li>Gestire eventuali controversie</li>
            </ul>
            <p>
              I dati raccolti tramite cookie analitici vengono conservati per un massimo di 26 mesi, 
              mentre i cookie tecnici vengono eliminati alla chiusura del browser.
            </p>

            <h2>6. Comunicazione dei Dati</h2>
            <p>I tuoi dati personali non vengono venduti a terzi. Possono essere comunicati a:</p>
            <ul>
              <li>Fornitori di servizi tecnici (hosting, email marketing) che agiscono come responsabili del trattamento</li>
              <li>Autorità competenti quando richiesto dalla legge</li>
              <li>Consulenti e professionisti per l'adempimento di obblighi legali</li>
            </ul>

            <h2>7. Trasferimento dei Dati</h2>
            <p>
              I tuoi dati personali sono trattati principalmente in Italia. Alcuni servizi utilizzati 
              (come Google Analytics) potrebbero trasferire i dati negli Stati Uniti, ma solo con 
              adeguate garanzie di protezione conformi al GDPR.
            </p>

            <h2>8. I Tuoi Diritti</h2>
            <p>In qualità di interessato, hai il diritto di:</p>
            <ul>
              <li><strong>Accesso:</strong> ottenere informazioni sui tuoi dati personali</li>
              <li><strong>Rettifica:</strong> correggere dati inesatti o incompleti</li>
              <li><strong>Cancellazione:</strong> richiedere la cancellazione dei tuoi dati ("diritto all'oblio")</li>
              <li><strong>Limitazione:</strong> limitare il trattamento dei tuoi dati</li>
              <li><strong>Portabilità:</strong> ricevere i tuoi dati in formato strutturato</li>
              <li><strong>Opposizione:</strong> opporti al trattamento per motivi legittimi</li>
              <li><strong>Revoca del consenso:</strong> revocare il consenso in qualsiasi momento</li>
            </ul>
            <p>
              Per esercitare questi diritti, contattaci all'indirizzo <strong>simonciniliquiplast@gmail.com</strong>. 
              Risponderemo entro 30 giorni dalla richiesta.
            </p>

            <h2>9. Cookie</h2>
            <p>Il nostro sito utilizza i seguenti tipi di cookie:</p>
            
            <h3>Cookie Tecnici (sempre attivi)</h3>
            <p>
              Necessari per il funzionamento del sito web. Non richiedono consenso e includono 
              cookie per la sicurezza, la navigazione e le preferenze di base.
            </p>

            <h3>Cookie Analitici (richiedono consenso)</h3>
            <p>
              Utilizzati per analizzare il traffico del sito tramite Google Analytics. 
              Ci aiutano a capire come i visitatori utilizzano il sito per migliorarlo.
            </p>

            <h3>Gestione dei Cookie</h3>
            <p>
              Puoi gestire le tue preferenze sui cookie tramite il banner che appare 
              alla prima visita del sito. Puoi anche modificare le impostazioni del 
              tuo browser per bloccare o eliminare i cookie.
            </p>

            <h2>10. Sicurezza dei Dati</h2>
            <p>
              Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati personali 
              da accessi non autorizzati, perdita, distruzione o alterazione. Utilizziamo connessioni 
              crittografate (HTTPS) e sistemi di sicurezza aggiornati.
            </p>

            <h2>11. Minori</h2>
            <p>
              Il nostro sito non è rivolto a minori di 16 anni. Non raccogliamo consapevolmente 
              dati personali da minori. Se veniamo a conoscenza di aver raccolto dati da un minore, 
              procederemo immediatamente alla loro cancellazione.
            </p>

            <h2>12. Modifiche alla Privacy Policy</h2>
            <p>
              Ci riserviamo il diritto di modificare questa informativa privacy. Le modifiche 
              saranno pubblicate su questa pagina con la data di aggiornamento. Ti invitiamo 
              a consultare regolarmente questa pagina per rimanere informato.
            </p>

            <h2>13. Reclami</h2>
            <p>
              Se ritieni che il trattamento dei tuoi dati personali violi la normativa sulla 
              protezione dei dati, hai il diritto di presentare un reclamo all'autorità di 
              controllo competente (Garante per la protezione dei dati personali).
            </p>

            <h2>14. Contatti</h2>
            <p>
              Per qualsiasi domanda relativa a questa informativa privacy o al trattamento 
              dei tuoi dati personali, puoi contattarci:
            </p>
            <ul>
              <li><strong>Email:</strong> simonciniliquiplast@gmail.com</li>
              <li><strong>Telefono:</strong> +39 393 8657606</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 