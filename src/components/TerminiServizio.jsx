import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './PrivacyPolicy.module.css'; // Riuso lo stesso stile

const TerminiServizio = () => {
  return (
    <div className={styles.privacyPage}>
      <Navbar />
      
      <main className={styles.privacyMain}>
        <div className={styles.container}>
          <h1 className={styles.privacyTitle}>Termini e Condizioni di Servizio</h1>
          <p className={styles.lastUpdated}>Ultimo aggiornamento: 19 dicembre 2024</p>

          <div className={styles.content}>
            <h2>1. Informazioni Generali</h2>
            <p>
              Questi termini e condizioni regolano l'uso del sito web <strong>www.maurosimoncini.it</strong> 
              gestito da <strong>Mauro Simoncini</strong>, esperto in impermeabilizzazioni con sede in Italia.
            </p>
            <p>
              Utilizzando il nostro sito web, accetti questi termini nella loro interezza. 
              Se non accetti questi termini, non utilizzare il sito web.
            </p>

            <h2>2. Servizi Offerti</h2>
            <p>Il sito web offre i seguenti servizi:</p>
            <ul>
              <li>Consulenza tecnica specializzata in impermeabilizzazioni</li>
              <li>Informazioni e guide sui prodotti per impermeabilizzazione</li>
              <li>Supporto nella scelta delle soluzioni più appropriate</li>
              <li>Contenuti educativi e formativi del settore</li>
            </ul>

            <h2>3. Utilizzo del Sito</h2>
            <p>L'utilizzo del sito è consentito per:</p>
            <ul>
              <li>Consultare informazioni sui servizi offerti</li>
              <li>Richiedere consulenze tecniche</li>
              <li>Accedere ai contenuti educativi</li>
              <li>Contattare il titolare per informazioni commerciali</li>
            </ul>

            <h2>4. Restrizioni d'Uso</h2>
            <p>È vietato utilizzare il sito per:</p>
            <ul>
              <li>Attività illegali o non autorizzate</li>
              <li>Trasmettere virus, malware o codice dannoso</li>
              <li>Violare i diritti di proprietà intellettuale</li>
              <li>Interferire con il funzionamento del sito</li>
              <li>Raccogliere informazioni personali di altri utenti</li>
            </ul>

            <h2>5. Proprietà Intellettuale</h2>
            <p>
              Tutti i contenuti del sito web, inclusi testi, immagini, video, loghi e grafica, 
              sono di proprietà di Mauro Simoncini o utilizzati con licenza.
            </p>
            <p>
              È vietata la riproduzione, distribuzione, modifica o utilizzo commerciale 
              dei contenuti senza autorizzazione scritta.
            </p>

            <h2>6. Consulenze e Servizi</h2>
            <p>
              Le consulenze fornite hanno carattere informativo e si basano sull'esperienza 
              professionale del titolare. Non costituiscono garanzia di risultato.
            </p>
            <p>
              Per interventi specifici è sempre consigliabile consultare un tecnico qualificato 
              e verificare la conformità alle normative locali.
            </p>

            <h2>7. Limitazione di Responsabilità</h2>
            <p>
              Mauro Simoncini non è responsabile per:
            </p>
            <ul>
              <li>Danni diretti o indiretti derivanti dall'uso del sito</li>
              <li>Interruzioni del servizio o errori tecnici</li>
              <li>Decisioni prese sulla base delle informazioni fornite</li>
              <li>Risultati di interventi eseguiti da terzi</li>
            </ul>

            <h2>8. Accuratezza delle Informazioni</h2>
            <p>
              Ci impegniamo a fornire informazioni accurate e aggiornate, ma non garantiamo 
              la completezza o l'assenza di errori. Le informazioni possono essere modificate 
              senza preavviso.
            </p>

            <h2>9. Link Esterni</h2>
            <p>
              Il sito può contenere link a siti web di terze parti. Non siamo responsabili 
              per il contenuto o le politiche di privacy di questi siti esterni.
            </p>

            <h2>10. Raccolta Dati</h2>
            <p>
              La raccolta e il trattamento dei dati personali sono regolati dalla nostra 
              Privacy Policy, che costituisce parte integrante di questi termini.
            </p>

            <h2>11. Modifiche ai Termini</h2>
            <p>
              Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. 
              Le modifiche entrano in vigore immediatamente dopo la pubblicazione sul sito.
            </p>
            <p>
              L'uso continuato del sito dopo le modifiche costituisce accettazione dei nuovi termini.
            </p>

            <h2>12. Risoluzione delle Controversie</h2>
            <p>
              Eventuali controversie saranno risolte secondo la legge italiana. 
              Il foro competente è quello del luogo di residenza del titolare.
            </p>

            <h2>13. Validità</h2>
            <p>
              Se una disposizione di questi termini dovesse risultare non valida, 
              le restanti disposizioni rimarranno in vigore.
            </p>

            <h2>14. Contatti</h2>
            <p>
              Per domande sui termini di servizio o sui nostri servizi, contattaci:
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

export default TerminiServizio; 