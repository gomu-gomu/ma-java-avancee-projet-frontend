// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Student Management',
      meta: [{ name: 'description', content: 'The frontend for student management web app.' }],
      htmlAttrs: {
        dir: 'ltr'
      }
    }
  },
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxt/fonts', '@vueuse/nuxt', "@nuxtjs/i18n"],
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  devtools: {
    enabled: true
  },
  i18n: {
    vueI18n: './i18n.config.ts'
  }
});