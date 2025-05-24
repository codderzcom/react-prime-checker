import {defineConfig, UserConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    browser: {
      name: 'chrome',
    }
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, './src/')
      }
    ]
  }
} as UserConfig)
