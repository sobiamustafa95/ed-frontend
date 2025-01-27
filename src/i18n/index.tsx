import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

import en from '../locales/en.json';

const resources = {
  en,
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
  debug: false,
  fallbackLng: 'en',
  saveMissing: true,
});

export default i18next;
