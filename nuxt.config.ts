// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@primevue/nuxt-module'
  ],

  primevue: {
    autoImport: true,
    composables: {
        include: '*'
    },
    options: {
            ripple: true,
            inputVariant: 'filled',
            theme: {
                preset: Aura
            }
        }
    }
})