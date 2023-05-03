export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      DATABASE_ID: process.env.NUXT_DATABASE_ID,
      COLLECTION_ID: process.env.NUXT_COLLECTION_ID,
      PROJECT_ID: process.env.NUXT_PROJECT_ID,
      API_ENDPOINT: process.env.NUXT_API_ENDPOINT,
    },
  },
});
