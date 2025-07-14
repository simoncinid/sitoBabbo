/**
 * Cookie Manager per conformità GDPR e normative italiane/europee
 */

export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics', 
  MARKETING: 'marketing',
  PREFERENCES: 'preferences'
};

export const COOKIE_CONSENT_KEY = 'maisenza_cookie_consent';
export const COOKIE_PREFERENCES_KEY = 'maisenza_cookie_preferences';

export class CookieManager {
  static defaultPreferences = {
    [COOKIE_CATEGORIES.NECESSARY]: true, // Sempre attivi
    [COOKIE_CATEGORIES.ANALYTICS]: false,
    [COOKIE_CATEGORIES.MARKETING]: false,
    [COOKIE_CATEGORIES.PREFERENCES]: false,
    consentGiven: false,
    consentDate: null,
    version: '1.0'
  };

  /**
   * Ottiene le preferenze cookie salvate
   */
  static getPreferences() {
    try {
      const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (saved) {
        return { ...this.defaultPreferences, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Errore nel leggere le preferenze cookie:', error);
    }
    return this.defaultPreferences;
  }

  /**
   * Salva le preferenze cookie
   */
  static setPreferences(preferences) {
    try {
      const newPreferences = {
        ...this.defaultPreferences,
        ...preferences,
        consentDate: new Date().toISOString(),
        version: '1.0'
      };
      
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences));
      
      // Applica le nuove preferenze
      this.applyPreferences(newPreferences);
      
      return newPreferences;
    } catch (error) {
      console.error('Errore nel salvare le preferenze cookie:', error);
      return this.defaultPreferences;
    }
  }

  /**
   * Verifica se il consenso è stato dato
   */
  static hasConsent() {
    const preferences = this.getPreferences();
    return preferences.consentGiven;
  }

  /**
   * Verifica se una categoria di cookie è abilitata
   */
  static isCategoryEnabled(category) {
    const preferences = this.getPreferences();
    return preferences[category] === true;
  }

  /**
   * Accetta tutti i cookie
   */
  static acceptAll() {
    return this.setPreferences({
      [COOKIE_CATEGORIES.NECESSARY]: true,
      [COOKIE_CATEGORIES.ANALYTICS]: true,
      [COOKIE_CATEGORIES.MARKETING]: true,
      [COOKIE_CATEGORIES.PREFERENCES]: true,
      consentGiven: true
    });
  }

  /**
   * Accetta solo i cookie necessari
   */
  static acceptNecessaryOnly() {
    return this.setPreferences({
      [COOKIE_CATEGORIES.NECESSARY]: true,
      [COOKIE_CATEGORIES.ANALYTICS]: false,
      [COOKIE_CATEGORIES.MARKETING]: false,
      [COOKIE_CATEGORIES.PREFERENCES]: false,
      consentGiven: true
    });
  }

  /**
   * Rifiuta tutti i cookie non necessari
   */
  static rejectAll() {
    return this.acceptNecessaryOnly();
  }

  /**
   * Applica le preferenze (abilita/disabilita servizi)
   */
  static applyPreferences(preferences) {
    // Gestione Google Analytics
    if (preferences[COOKIE_CATEGORIES.ANALYTICS]) {
      this.enableAnalytics();
    } else {
      this.disableAnalytics();
    }

    // Gestione Marketing/Tracking
    if (preferences[COOKIE_CATEGORIES.MARKETING]) {
      this.enableMarketing();
    } else {
      this.disableMarketing();
    }

    // Gestione Preferenze (tema, lingua, ecc.)
    if (preferences[COOKIE_CATEGORIES.PREFERENCES]) {
      this.enablePreferences();
    } else {
      this.disablePreferences();
    }

    // Emetti evento per altri componenti
    window.dispatchEvent(new CustomEvent('cookiePreferencesChanged', {
      detail: preferences
    }));
  }

  /**
   * Abilita Google Analytics
   */
  static enableAnalytics() {
    // Esempio: Google Analytics 4
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  }

  /**
   * Disabilita Google Analytics
   */
  static disableAnalytics() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  }

  /**
   * Abilita cookie di marketing
   */
  static enableMarketing() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
  }

  /**
   * Disabilita cookie di marketing
   */
  static disableMarketing() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  }

  /**
   * Abilita cookie di preferenze
   */
  static enablePreferences() {
    // Implementa logica per cookie di preferenze
  }

  /**
   * Disabilita cookie di preferenze
   */
  static disablePreferences() {
    // Implementa logica per disabilitare cookie di preferenze
  }

  /**
   * Cancella tutti i cookie non necessari
   */
  static clearNonEssentialCookies() {
    const cookies = document.cookie.split(";");
    
    // Lista cookie necessari da non cancellare
    const essentialCookies = [
      COOKIE_PREFERENCES_KEY,
      'session',
      'csrf'
    ];

    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      if (!essentialCookies.some(essential => name.includes(essential))) {
        // Cancella il cookie
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      }
    });
  }

  /**
   * Resetta tutte le preferenze
   */
  static reset() {
    try {
      localStorage.removeItem(COOKIE_PREFERENCES_KEY);
      this.clearNonEssentialCookies();
    } catch (error) {
      console.error('Errore nel reset delle preferenze:', error);
    }
  }

  /**
   * Inizializza il cookie manager
   */
  static init() {
    const preferences = this.getPreferences();
    
    if (preferences.consentGiven) {
      this.applyPreferences(preferences);
    } else {
      // Imposta consenso di default negato per conformità GDPR
      if (window.gtag) {
        window.gtag('consent', 'default', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
      }
    }
  }
}

/**
 * Informazioni sui cookie utilizzati
 */
export const COOKIE_INFO = {
  [COOKIE_CATEGORIES.NECESSARY]: {
    name: 'Cookie Necessari',
    description: 'Questi cookie sono essenziali per il funzionamento del sito web e non possono essere disabilitati. Includono cookie per la sicurezza, l\'autenticazione e le preferenze di base.',
    cookies: [
      {
        name: 'maisenza_cookie_preferences',
        purpose: 'Memorizza le tue preferenze sui cookie',
        duration: '1 anno',
        type: 'Locale'
      }
    ]
  },
  [COOKIE_CATEGORIES.ANALYTICS]: {
    name: 'Cookie Analitici',
    description: 'Questi cookie ci aiutano a capire come i visitatori interagiscono con il nostro sito raccogliendo informazioni in forma anonima.',
    cookies: [
      {
        name: '_ga, _ga_*',
        purpose: 'Google Analytics - analisi del traffico del sito',
        duration: '2 anni',
        type: 'Terze parti (Google)'
      }
    ]
  },
  [COOKIE_CATEGORIES.MARKETING]: {
    name: 'Cookie di Marketing',
    description: 'Questi cookie vengono utilizzati per tracciare i visitatori sui siti web per mostrare annunci pertinenti e coinvolgenti.',
    cookies: [
      {
        name: '_fbp, _fbc',
        purpose: 'Facebook Pixel - retargeting e analytics',
        duration: '3 mesi',
        type: 'Terze parti (Facebook)'
      }
    ]
  },
  [COOKIE_CATEGORIES.PREFERENCES]: {
    name: 'Cookie di Preferenze',
    description: 'Questi cookie permettono al sito di ricordare le scelte che fai per offrirti funzionalità migliorate e contenuti personalizzati.',
    cookies: [
      {
        name: 'theme_preference',
        purpose: 'Memorizza le preferenze del tema scuro/chiaro',
        duration: '1 anno',
        type: 'Locale'
      }
    ]
  }
}; 