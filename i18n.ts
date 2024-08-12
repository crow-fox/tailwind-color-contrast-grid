import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Unselect: "Unselect",
      "Please select a color": "Please select a color",
    },
  },
  ja: {
    translation: {
      Unselect: "選択解除",
      "Please select a color": "色を選択してください",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
