import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ListaAlimentos() {
  const [alimentos, setAlimentos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const buscarAlimentos = async () => {
      const { data, error } = await supabase
        .from('alimentos')
        .select('*')
        .order('validade', { ascending: true })

      if (error) {
        console.error('Erro ao buscar alimentos:', error)
      } else {
        setAlimentos(data)
      }

      setCarregando(false)
    }

    buscarAlimentos()
  }, [])

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Lista de Alimentos</h2>
      {carregando ? (
        <p>Carregando...</p>
      ) : alimentos.length === 0 ? (
        <p>Nenhum alimento cadastrado.</p>
      ) : (
        <ul>
          {alimentos.map((alimento) => (
            <li key={alimento.id}>
              <strong>{alimento.nome}</strong> — vence em{' '}
              {new Date(alimento.validade).toLocaleDateString()} ({alimento.local})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
