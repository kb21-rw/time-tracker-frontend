import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    env: {
        VITE_API_URL: process.env.VITE_API_URL,
        VITE_API_VERSION: process.env.VITE_API_VERSION,
        VITE_APP_NAME: process.env.VITE_APP_NAME,
    },
})
