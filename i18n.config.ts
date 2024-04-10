export default defineI18nConfig(async () => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: await import('~/assets/i18n/en.json'),
    fr: await import('~/assets/i18n/fr.json'),
    ar: await import('~/assets/i18n/ar.json')
  }
}));