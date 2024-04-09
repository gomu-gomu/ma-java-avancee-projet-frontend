export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      settings: {
        title: 'Settings',
        language: {
          title: 'Language',
          description: 'Changes the display language of the app',
          options: {
            fr: 'French',
            en: 'English'
          }
        }
      }
    },
    fr: {
      settings: {
        title: 'Paramètres',
        language: {
          title: 'Langue',
          description: 'Change la langue d\'affichage de l\'application',
          options: {
            en: 'Anglais',
            fr: 'Français'
          }
        }
      }
    }
  }
}));