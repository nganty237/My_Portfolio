import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(rootDir, 'index.html'),
        about: path.resolve(rootDir, 'about.html'),
        projects: path.resolve(rootDir, 'projects.html'),
        contact: path.resolve(rootDir, 'contact.html'),
        project: path.resolve(rootDir, 'project.html'),
      },
    },
  },
})
