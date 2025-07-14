import React from 'react';
import { FaShieldAlt, FaUserShield, FaLock, FaGavel, FaEnvelope } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyPage}>
      <Navbar />
      
      <main className={styles.privacyMain}>
        <div className={styles.container}>
          <header className={styles.privacyHeader}>
            <h1 className={styles.privacyTitle}>
              <FaShieldAlt /> Privacy Policy e Cookie Policy
            </h1>
            <p className={styles.privacySubtitle}>
              Informativa sul trattamento dei dati personali ai sensi del GDPR e della normativa italiana
            </p>
            <div className={styles.lastUpdated}>
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </div>
          </header>

          <div className={styles.privacyContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <FaUserShield /> 1. Titolare del trattamento
              </h2>
              <div className={styles.sectionContent}>
                <p>
                  Il titolare del trattamento dei dati personali è <strong>Mai Senza Impermeabilizzazioni</strong>, 
                  nella persona di <strong>Mauro Simoncini</strong>.
                </p>
                <div className={styles.contactBox}>
                  <h4>Contatti del Titolare:</h4>
                  <ul>
                    <li><strong>Email:</strong> privacy@maisenza.it</li>
                    <li><strong>PEC:</strong> maisenza@pec.it</li>
                    <li><strong>Telefono:</strong> +39 393 8657606</li>
                    <li><strong>Indirizzo:</strong> Italia</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <FaGavel /> 2. Finalità e base giuridica del trattamento
              </h2>
              <div className={styles.sectionContent}>
                <div className={styles.purposeCard}>
                  <h4>Finalità Essenziali (base giuridica: legittimo interesse)</h4>
                  <ul>
                    <li>Erogazione dei servizi di consulenza richiesti</li>
                    <li>Risposta a richieste di informazioni</li>
                    <li>Gestione delle comunicazioni via WhatsApp e email</li>
                    <li>Adempimenti di legge e contabili</li>
                  </ul>
                </div>

                <div className={styles.purposeCard}>
                  <h4>Finalità basate sul consenso</h4>
                  <ul>
                    <li>Invio di newsletter e comunicazioni commerciali</li>
                    <li>Analisi statistiche tramite Google Analytics</li>
                    <li>Attività di marketing e retargeting</li>
                    <li>Personalizzazione dell'esperienza utente</li>
                  </ul>
                  <p className={styles.consentNote}>
                    <strong>Nota:</strong> Puoi revocare il consenso in qualsiasi momento senza pregiudicare 
                    la liceità del trattamento basata sul consenso prestato prima della revoca.
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <FaLock /> 3. Categorie di dati trattati
              </h2>
              <div className={styles.sectionContent}>
                <div className={styles.dataCategories}>
                  <div className={styles.dataCategory}>
                    <h4>Dati di Contatto</h4>
                    <p>Nome, cognome, email, numero di telefono, indirizzo</p>
                  </div>
                  <div className={styles.dataCategory}>
                    <h4>Dati di Navigazione</h4>
                    <p>Indirizzo IP, tipo di browser, pagine visitate, tempo di permanenza</p>
                  </div>
                  <div className={styles.dataCategory}>
                    <h4>Dati Tecnici</h4>
                    <p>Informazioni sui problemi di impermeabilizzazione, foto e descrizioni inviate</p>
                  </div>
                  <div className={styles.dataCategory}>
                    <h4>Cookie e Identificatori</h4>
                    <p>Cookie tecnici, di preferenze, analitici e di marketing (previo consenso)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>4. Cookie utilizzati</h2>
              <div className={styles.sectionContent}>
                <div className={styles.cookieTable}>
                  <h4>Cookie Necessari (sempre attivi)</h4>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Finalità</th>
                        <th>Durata</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>maisenza_cookie_preferences</td>
                        <td>Memorizza le preferenze sui cookie</td>
                        <td>1 anno</td>
                        <td>Locale</td>
                      </tr>
                      <tr>
                        <td>session_id</td>
                        <td>Gestione della sessione utente</td>
                        <td>Sessione</td>
                        <td>Locale</td>
                      </tr>
                    </tbody>
                  </table>

                  <h4>Cookie Analitici (previa autorizzazione)</h4>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Finalità</th>
                        <th>Durata</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>_ga, _ga_*</td>
                        <td>Google Analytics - analisi del traffico</td>
                        <td>2 anni</td>
                        <td>Terze parti (Google)</td>
                      </tr>
                      <tr>
                        <td>_gid</td>
                        <td>Google Analytics - identificazione utenti</td>
                        <td>24 ore</td>
                        <td>Terze parti (Google)</td>
                      </tr>
                    </tbody>
                  </table>

                  <h4>Cookie di Marketing (previa autorizzazione)</h4>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Finalità</th>
                        <th>Durata</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>_fbp, _fbc</td>
                        <td>Facebook Pixel - retargeting</td>
                        <td>3 mesi</td>
                        <td>Terze parti (Facebook)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>5. Condivisione e trasferimento dei dati</h2>
              <div className={styles.sectionContent}>
                <p>I tuoi dati personali possono essere condivisi con:</p>
                <div className={styles.recipientsList}>
                  <div className={styles.recipient}>
                    <h4>Fornitori di Servizi Tecnici</h4>
                    <p>Provider di hosting, servizi email, analytics che agiscono come responsabili del trattamento</p>
                  </div>
                  <div className={styles.recipient}>
                    <h4>Autorità Competenti</h4>
                    <p>Solo in caso di obblighi di legge o richieste delle autorità giudiziarie</p>
                  </div>
                </div>

                <div className={styles.transferInfo}>
                  <h4>Trasferimenti Internazionali</h4>
                  <p>
                    Alcuni fornitori di servizi (Google, Facebook) possono trasferire dati al di fuori dell'UE. 
                    Questi trasferimenti sono protetti da:
                  </p>
                  <ul>
                    <li>Decisioni di adeguatezza della Commissione Europea</li>
                    <li>Clausole contrattuali tipo approvate dalla Commissione</li>
                    <li>Misure tecniche e organizzative supplementari</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>6. Conservazione dei dati</h2>
              <div className={styles.sectionContent}>
                <div className={styles.retentionTable}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Tipo di dato</th>
                        <th>Periodo di conservazione</th>
                        <th>Motivo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dati di contatto per servizi</td>
                        <td>5 anni dall'ultimo contatto</td>
                        <td>Gestione rapporto commerciale</td>
                      </tr>
                      <tr>
                        <td>Dati di newsletter</td>
                        <td>Fino a revoca del consenso</td>
                        <td>Invio comunicazioni</td>
                      </tr>
                      <tr>
                        <td>Dati di analytics</td>
                        <td>26 mesi</td>
                        <td>Analisi statistiche</td>
                      </tr>
                      <tr>
                        <td>Log di sicurezza</td>
                        <td>1 anno</td>
                        <td>Sicurezza informatica</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>7. I tuoi diritti</h2>
              <div className={styles.sectionContent}>
                <p>Hai il diritto di:</p>
                <div className={styles.rightsList}>
                  <div className={styles.right}>
                    <h4>Accesso (Art. 15 GDPR)</h4>
                    <p>Ottenere informazioni sui tuoi dati e una copia degli stessi</p>
                  </div>
                  <div className={styles.right}>
                    <h4>Rettifica (Art. 16 GDPR)</h4>
                    <p>Correggere dati inesatti o incomplete</p>
                  </div>
                  <div className={styles.right}>
                    <h4>Cancellazione (Art. 17 GDPR)</h4>
                    <p>Richiedere la cancellazione dei tuoi dati in determinate circostanze</p>
                  </div>
                  <div className={styles.right}>
                    <h4>Limitazione (Art. 18 GDPR)</h4>
                    <p>Limitare il trattamento dei tuoi dati in determinate circostanze</p>
                  </div>
                  <div className={styles.right}>
                    <h4>Portabilità (Art. 20 GDPR)</h4>
                    <p>Ricevere i tuoi dati in formato strutturato e trasferirli</p>
                  </div>
                  <div className={styles.right}>
                    <h4>Opposizione (Art. 21 GDPR)</h4>
                    <p>Opporti al trattamento basato su legittimo interesse</p>
                  </div>
                </div>

                <div className={styles.exerciseRights}>
                  <h4>Come esercitare i tuoi diritti</h4>
                  <p>
                    Per esercitare i tuoi diritti, contattaci a: 
                    <strong> privacy@maisenza.it</strong> o tramite WhatsApp al numero 
                    <strong> +39 393 8657606</strong>.
                  </p>
                  <p>
                    Risponderemo alla tua richiesta entro 30 giorni. 
                    Se non sei soddisfatto della nostra risposta, puoi presentare reclamo al 
                    <strong> Garante per la Protezione dei Dati Personali</strong>.
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>8. Sicurezza dei dati</h2>
              <div className={styles.sectionContent}>
                <p>Implementiamo le seguenti misure di sicurezza:</p>
                <div className={styles.securityMeasures}>
                  <div className={styles.measure}>
                    <h4>Crittografia</h4>
                    <p>Connessioni HTTPS e crittografia dei dati sensibili</p>
                  </div>
                  <div className={styles.measure}>
                    <h4>Controllo Accessi</h4>
                    <p>Accesso limitato ai dati solo al personale autorizzato</p>
                  </div>
                  <div className={styles.measure}>
                    <h4>Backup e Ripristino</h4>
                    <p>Backup regolari e procedure di ripristino sicure</p>
                  </div>
                  <div className={styles.measure}>
                    <h4>Monitoraggio</h4>
                    <p>Monitoraggio continuo per rilevare accessi non autorizzati</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>9. Modifiche alla Privacy Policy</h2>
              <div className={styles.sectionContent}>
                <p>
                  Ci riserviamo il diritto di modificare questa informativa privacy per conformarci a 
                  cambiamenti normativi o operativi. Le modifiche sostanziali saranno comunicate tramite:
                </p>
                <ul>
                  <li>Avviso prominente sul sito web</li>
                  <li>Email agli utenti registrati</li>
                  <li>Aggiornamento della data di "ultimo aggiornamento"</li>
                </ul>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <FaEnvelope /> 10. Contatti
              </h2>
              <div className={styles.sectionContent}>
                <div className={styles.contactFinal}>
                  <p>
                    Per qualsiasi domanda relativa a questa informativa privacy o al trattamento 
                    dei tuoi dati personali, non esitare a contattarci:
                  </p>
                  <div className={styles.contactDetails}>
                    <div className={styles.contactMethod}>
                      <strong>Email Privacy:</strong> privacy@maisenza.it
                    </div>
                    <div className={styles.contactMethod}>
                      <strong>WhatsApp:</strong> +39 393 8657606
                    </div>
                    <div className={styles.contactMethod}>
                      <strong>Telefono:</strong> +39 393 8657606
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 