// Importa a função createClient da biblioteca oficial do Supabase
import { createClient } from '@supabase/supabase-js'

// Recupera a URL do Supabase a partir das variáveis de ambiente (.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

// Recupera a chave pública anônima do Supabase (anon key) do .env
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL ou Anon Key não definidos. Verifique seu arquivo .env')
}

// Cria o cliente Supabase que será usado para fazer as requisições
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
