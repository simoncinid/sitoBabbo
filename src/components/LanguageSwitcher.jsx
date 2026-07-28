import { useEffect, useState } from 'react';
import styles from './LanguageSwitcher.module.css';

const STORAGE_KEY = 'mai-senza-language';
const SOURCE_LANGUAGE = 'it';

const languages = [
  { code: 'it', label: 'Italiano' }, { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' }, { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' }, { code: 'pt', label: 'Português' },
  { code: 'nl', label: 'Nederlands' }, { code: 'pl', label: 'Polski' },
  { code: 'ro', label: 'Română' }, { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' }, { code: 'zh-CN', label: '中文' },
  { code: 'ja', label: '日本語' },
];

const countryLanguages = {
  IT: 'it', GB: 'en', US: 'en', CA: 'en', AU: 'en', IE: 'en', FR: 'fr', BE: 'fr',
  DE: 'de', AT: 'de', CH: 'de', ES: 'es', PT: 'pt', BR: 'pt', NL: 'nl', PL: 'pl',
  RO: 'ro', RU: 'ru', SA: 'ar', AE: 'ar', EG: 'ar', CN: 'zh-CN', JP: 'ja',
};

const supportedLanguage = (value) => languages.some(({ code }) => code === value);

function readGoogleLanguage() {
  const match = document.cookie.match(/(?:^|; )googtrans=\/it\/([^;]+)/);
  return match ? decodeURIComponent(match[1]) : SOURCE_LANGUAGE;
}

function setGoogleLanguage(language) {
  document.cookie = `googtrans=/it/${language}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax`;
}

function loadGoogleTranslate() {
  if (window.google?.translate) return;
  window.googleTranslateElementInit = () => {
    if (!window.google?.translate || document.getElementById('google_translate_element')?.childNodes.length) return;
    new window.google.translate.TranslateElement({
      pageLanguage: SOURCE_LANGUAGE,
      includedLanguages: languages.map(({ code }) => code).join(','),
      autoDisplay: false,
    }, 'google_translate_element');
  };
  if (document.getElementById('google-translate-script')) return;
  const script = document.createElement('script');
  script.id = 'google-translate-script';
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

async function detectLanguage() {
  try {
    const response = await fetch('/api/visitor-locale', { cache: 'no-store' });
    if (response.ok) {
      const { country } = await response.json();
      if (countryLanguages[country]) return countryLanguages[country];
    }
  } catch {
    // In locale, il server potrebbe non esporre gli header geografici.
  }
  const browserLanguage = navigator.language || SOURCE_LANGUAGE;
  const exact = languages.find(({ code }) => code.toLowerCase() === browserLanguage.toLowerCase());
  const base = browserLanguage.split('-')[0];
  return exact?.code || (supportedLanguage(base) ? base : 'en');
}

export default function LanguageSwitcher({ mobile = false }) {
  const [language, setLanguage] = useState(() => readGoogleLanguage());

  useEffect(() => {
    let active = true;
    const initialise = async () => {
      loadGoogleTranslate();
      const savedLanguage = localStorage.getItem(STORAGE_KEY);
      const preferredLanguage = supportedLanguage(savedLanguage) ? savedLanguage : await detectLanguage();
      if (!active) return;
      setLanguage(preferredLanguage);
      if (readGoogleLanguage() !== preferredLanguage) {
        setGoogleLanguage(preferredLanguage);
        window.location.reload();
      }
    };
    initialise();
    return () => { active = false; };
  }, []);

  const changeLanguage = (event) => {
    const nextLanguage = event.target.value;
    localStorage.setItem(STORAGE_KEY, nextLanguage);
    setGoogleLanguage(nextLanguage);
    setLanguage(nextLanguage);
    window.location.reload();
  };

  return (
    <div className={`${styles.switcher} ${mobile ? styles.mobile : ''}`}>
      <label className="sr-only" htmlFor={mobile ? 'site-language-mobile' : 'site-language'}>Lingua del sito</label>
      <span aria-hidden="true" className={styles.icon}>◎</span>
      <select id={mobile ? 'site-language-mobile' : 'site-language'} className={styles.select} value={language} onChange={changeLanguage} aria-label="Lingua del sito">
        {languages.map(({ code, label }) => <option key={code} value={code}>{label}</option>)}
      </select>
    </div>
  );
}
