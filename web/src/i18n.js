import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {},
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  // we do not use keys in form messages.welcome
  keySeparator: false,

  interpolation: {
    // react already safes from xss
    escapeValue: false,
  },

  // Return the English version if the string is not translated
  saveMissing: true,
});

export default i18n;
