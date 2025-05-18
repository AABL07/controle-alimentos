import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import CadastroAlimento from './components/CadastroAlimento'
import ListaAlimentos from './components/ListaAlimentos'
import './App.css'

const [temaEscuro, setTemaEscuro] = useState(false)

useEffect(() => {
  document.body.className = temaEscuro ? 'dark' : 'light'
}, [temaEscuro])


function App() {
  const [count, setCount] = useState(0)

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
      <button onClick={() => setTemaEscuro(!temaEscuro)}>
  Mudar para tema {temaEscuro ? 'claro' : 'escuro'}
</button>

      <CadastroAlimento />
      <ListaAlimentos />

    </div>
  )
}

export default App
