import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend) // Load translations from backend
    .use(LanguageDetector) // Automatically detect user language
    .use(initReactI18next) // Passes i18n to React components
    .init({
        fallbackLng: 'en', // Default language
        debug: true, // Enable for debugging in development
        interpolation: {
            escapeValue: false, // React already handles escaping
        },
        backend: {
            // Path to the translation files inside src/assets/locales
            loadPath: '/locales/{{lng}}/translation.json', // Use {{lng}} to dynamically load based on language
        },
    });

export default i18n;
