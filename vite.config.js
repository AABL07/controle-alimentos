// Importa a função defineConfig da Vite
import { defineConfig } from 'vite'

// Importa o plugin oficial do React para Vite (necessário para JSX e outras features do React)
import react from '@vitejs/plugin-react'

// Exporta a configuração do Vite
export default defineConfig({
  // Ativa o plugin React no processo de build e desenvolvimento
  optimizeDeps: {
    include: ['@supabase/supabase-js']
  },
  ssr: {
    noExternal: ['@supabase/supabase-js']
  }
})