import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
    coverage: {
      reporter: ['text', 'json', 'html'],
      clean: true,
      all: true,
      src: ['./src'],
      "100": true,
      
    },
  },
})