/* eslint-disable @typescript-eslint/no-var-requires */
const Backend = require("i18next-http-backend");
const LanguageDetector = require("i18next-browser-languagedetector");

const i18NextConfig = {
  i18n: { locales: ["en", "pt-BR"], defaultLocale: "pt-BR" },
  use: [Backend, LanguageDetector],
  interpolation: {
    escapeValue: false,
  },
  serializeConfig: false,
};

module.exports = i18NextConfig;
