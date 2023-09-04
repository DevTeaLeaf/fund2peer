import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import languageEN from "#assets/languages/en/language.json";
import languageRU from "#assets/languages/ru/language.json";

const resources = {
  en: {
    translation: languageEN,
  },
  ru: {
    translation: languageRU,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
