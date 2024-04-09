export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      common: {
        search: 'Search'
      },
      home: {
        title: 'Dashboard'
      },
      users: {
        title: 'Users'
      },
      inbox: {
        title: 'Inbox'
      },
      settings: {
        title: 'Settings',
        theme: {
          title: 'Theme',
          description: 'Customize the look and feel of your dashboard.',
          options: {
            system: 'System',
            light: 'Light',
            dark: 'Dark'
          }
        },
        language: {
          title: 'Language',
          description: 'Changes the display language of the app.',
          options: {
            fr: 'French',
            en: 'English'
          }
        },
        notifications: {
          title: 'Notification channels',
          description: 'Where can we notify you?',
          email: {
            title: 'Email',
            description: 'Receive a daily email digest.'
          },
          desktop: {
            title: 'Desktop',
            description: 'Receive desktop notifications.'
          }
        },
        tabs: {
          general: 'General',
          notifications: 'Notifications'
        }
      }
    },
    fr: {
      common: {
        search: 'Recherche'
      },
      home: {
        title: 'Tableau de bord'
      },
      users: {
        title: 'Utilisateurs'
      },
      inbox: {
        title: 'Boîte de Réception'
      },
      settings: {
        title: 'Paramètres',
        theme: {
          title: 'Thème',
          description: 'Personnalisez l\'apparence de votre tableau de bord.',
          options: {
            system: 'Système',
            light: 'Léger',
            dark: 'Sombre'
          }
        },
        language: {
          title: 'Langue',
          description: 'Change la langue d\'affichage de l\'application.',
          options: {
            en: 'Anglais',
            fr: 'Français'
          }
        },
        notifications: {
          title: 'Canaux de notification',
          description: 'Où pouvons-nous vous avertir ?',
          email: {
            title: 'E-mail',
            description: 'Recevez un résumé quotidien par e-mail.'
          },
          desktop: {
            title: 'Bureau',
            description: 'Recevez des notifications sur le bureau.'
          }
        },
        tabs: {
          general: 'Générale',
          notifications: 'Notifications'
        }
      }
    }
  }
}));