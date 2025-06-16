// Importa os hooks React e o supabase client
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

// Importa os componentes do projeto
import CadastroAlimento from './components/CadastroAlimento'
import ListaAlimentos from './components/ListaAlimentos'

// Importa o CSS global
import './App.css'

// Função principal do App
function App() {
  // Estado para o tema escuro/claro (buscando do localStorage)
  const [temaEscuro, setTemaEscuro] = useState(() => {
    const salvo = localStorage.getItem('tema')
    return salvo === 'dark'
  })

  // Hook para aplicar a classe do tema no body e salvar no localStorage
  useEffect(() => {
    const tema = temaEscuro ? 'dark' : 'light'
    document.body.className = tema
    localStorage.setItem('tema', tema)
  }, [temaEscuro])

  // (Opcional) Testa a conexão com Supabase ao carregar
  useEffect(() => {
    const testarConexao = async () => {
      const { data, error } = await supabase.from('alimentos').select('*')
      console.log('Dados:', data)
      console.log('Erro:', error)
    }

    testarConexao()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Controle de Alimentos</h1>

      {/* Botão de alternar tema */}
      <button
        onClick={() => setTemaEscuro(!temaEscuro)}
        style={{ marginBottom: '20px' }}
      >
        {temaEscuro ? '☀️ Tema claro' : '🌙 Tema escuro'}
      </button>

      {/* Formulário de cadastro */}
      <CadastroAlimento />

      {/* Lista de alimentos */}
      <ListaAlimentos />
    </div>
  )
}

export default App
