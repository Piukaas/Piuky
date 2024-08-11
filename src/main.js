import App from "@/App.vue";
import "@/assets/styles.css";
import translations from "@/assets/translations.json";
import router from "@/router.js";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "bootstrap/dist/css/bootstrap.min.css";

function transformTranslations(translations) {
  const i18nStructure = {};

  Object.keys(translations).forEach((key) => {
    Object.keys(translations[key]).forEach((lang) => {
      if (!i18nStructure[lang]) {
        i18nStructure[lang] = {};
      }
      i18nStructure[lang][key] = translations[key][lang];
    });
  });

  return i18nStructure;
}

const messages = transformTranslations(translations);

// Check for saved language in localStorage or default to 'en'
const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale, // Use saved language or default
  fallbackLocale: "en",
  messages,
});

const app = createApp(App);

function changeLanguage(locale) {
  i18n.global.locale.value = locale; // Change the language reactively
  localStorage.setItem("locale", locale); // Save the new language preference
}

// Make the changeLanguage function available globally
app.config.globalProperties.$changeLanguage = changeLanguage;

app.use(router);
app.use(i18n);
app.use(Buefy);
app.mount("#app");
