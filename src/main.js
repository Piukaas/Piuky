import App from "@/App.vue";
import Languages from "@/assets/enums/languages";
import Themes from "@/assets/enums/themes";
import "@/assets/styles.scss";
import translations from "@/assets/translations.json";
import router from "@/router.js";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";

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

const savedLocale = localStorage.getItem("locale") || Languages.NL;

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: Languages.NL,
  messages,
});

const app = createApp(App);

function changeLanguage(locale) {
  i18n.global.locale.value = locale;
  localStorage.setItem("locale", locale);
}

app.config.globalProperties.$changeLanguage = changeLanguage;

function changeTheme(theme) {
  document.body.setAttribute("theme", theme);
  localStorage.setItem("theme", theme);
}

app.config.globalProperties.$changeTheme = changeTheme;

const savedTheme = localStorage.getItem("theme") || Themes.LIGHT;
document.body.setAttribute("theme", savedTheme);

app.use(router);
app.use(i18n);
app.use(Buefy);
app.mount("#app");
