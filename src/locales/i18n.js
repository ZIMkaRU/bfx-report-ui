/* eslint-disable import/extensions, import/no-unresolved, import/no-extraneous-dependencies */
// install these dependencies manually in projects that require i18n.js
// refer https://github.com/bitfinexcom/bfxuilib/blob/master/functions/i18n.spa.js

import i18n from 'i18next'
import backend from 'i18next-http-backend'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const { REACT_APP_ENV } = process.env

export const LANGUAGES = {
  en: 'en',
  'en-US': 'en',
  ru: 'ru',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  tr: 'tr',
  'tr-TR': 'tr',
  es: 'es-EM',
  'es-EM': 'es-EM',
  pt: 'pt-BR',
  'pt-PT': 'pt-BR',
  'pt-BR': 'pt-BR',
  vi: 'vi',
}

export const LANGUAGE_NAMES = {
  en: 'English',
  ru: 'Русский',
  'zh-CN': '中文 (简化)',
  'zh-TW': '中文 (繁體)',
  tr: 'Türkçe',
  'es-EM': 'Español',
  'pt-BR': 'Português',
  vi: 'Vietnamese',
}

i18n
  .use(backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['querystring', 'localStorage'],
      lookupQuerystring: 'locale',
    },

    parseMissingKeyHandler: (key) => {
      if (i18n.isInitialized) {
        // eslint-disable-next-line no-console
        console.warn(`Missing translation for ${key}`)
      }
      return key
    },
    // use en if detected lng is not available
    fallbackLng: LANGUAGES.en,

    ns: ['translations'],
    defaultNS: 'translations',

    debug: (REACT_APP_ENV === 'development'),

    react: {
      wait: true,
      useSuspense: false,
      //   bindI18n: 'languageChanged loaded',
      //   bindStore: 'added removed',
      //   nsMode: 'default'
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
