// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Student Management',
      meta: [
        { name: 'description', content: 'The frontend for student management web app.' }
      ]
    }
  },
  modules: ['@nuxt/ui'],
  devtools: { enabled: true }
});