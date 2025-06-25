import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import CadastroAlimento from './components/CadastroAlimento'
import ListaAlimentos from './components/ListaAlimentos'
import './App.css'

function App() {
  const [temaEscuro, setTemaEscuro] = useState(() => {
    const salvo = localStorage.getItem('tema')
    return salvo === 'dark'
  })

  useEffect(() => {
    const tema = temaEscuro ? 'dark' : 'light'
    document.body.className = tema
    localStorage.setItem('tema', tema)
  }, [temaEscuro])

  const [alimentos, setAlimentos] = useState([])

  useEffect(() => {
    const buscarAlimentos = async () => {
      const { data, error } = await supabase
        .from('alimentos')
        .select('*')
        .order('validade', { ascending: true })

      if (!error) setAlimentos(data)
    }

    buscarAlimentos()
  }, [])

  const adicionarAlimento = (novoAlimento) => {
    setAlimentos((prev) => [...prev, novoAlimento])
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Controle de Alimentos</h1>

      <button
        onClick={() => setTemaEscuro(!temaEscuro)}
        style={{ marginBottom: '20px' }}
      >
        {temaEscuro ? '☀️ Tema claro' : '🌙 Tema escuro'}
      </button>

      <CadastroAlimento onAlimentoAdicionado={adicionarAlimento} />
      <ListaAlimentos alimentos={alimentos} setAlimentos={setAlimentos} />
    </div>
  )
}

export default App
