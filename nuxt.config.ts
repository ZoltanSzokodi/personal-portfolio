import { projectRoutes } from './shared/data/projects'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,

  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/image'],

  css: ['~/assets/css/main.css'],

  eslint: {
    config: {
      stylistic: false,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#f6f7f2' },
        { name: 'color-scheme', content: 'light' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: 'http://localhost:3000/',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: projectRoutes,
    },
  },
})
