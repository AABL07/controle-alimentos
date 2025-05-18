import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ListaAlimentos() {
  const [alimentos, setAlimentos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [busca, setBusca] = useState('')
  const [filtroLocal, setFiltroLocal] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [editForm, setEditForm] = useState({
  nome: '',
  validade: '',
  local: ''
})


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

  const iniciarEdicao = (alimento) => {
  setEditandoId(alimento.id)
  setEditForm({
    nome: alimento.nome,
    validade: alimento.validade,
    local: alimento.local
  })
}

const salvarEdicao = async (id) => {
  const { error } = await supabase
    .from('alimentos')
    .update(editForm)
    .eq('id', id)

  if (error) {
    console.error('Erro ao editar:', error)
  } else {
    setAlimentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...editForm } : a))
    )
    setEditandoId(null)
  }
}


  return (
    <div style={{ marginBottom: '20px' }}>
  <input
    type="text"
    placeholder="Buscar por nome..."
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
    style={{ marginRight: '10px', padding: '6px' }}
  />

  <select
    value={filtroLocal}
    onChange={(e) => setFiltroLocal(e.target.value)}
    style={{ padding: '6px' }}
  >
    <option value="">Todos os locais</option>
    <option value="Geladeira">Geladeira</option>
    <option value="Freezer">Freezer</option>
    <option value="Armário">Armário</option>
  </select>
</div>
  )}

    <div style={{ marginTop: '40px' }}>
      <h2>Lista de Alimentos</h2>
      {carregando ? (
        <p>Carregando...</p>
      ) : alimentos.length === 0 ? (
        <p>Nenhum alimento cadastrado.</p>
      ) : (
        <ul>
          {alimentos.map((alimento) => {
            const hoje = new Date()
            const validade = new Date(alimento.validade)
            const diasRestantes = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24))

            let estilo = {}
            if (diasRestantes < 0) {
                estilo = { color: 'red' } // Vencido
            } else if (diasRestantes <= 3) {
                estilo = { color: 'orange' } // Vencendo em breve
  }
            const excluirAlimento = async (id) => {
  const { error } = await supabase
    .from('alimentos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao excluir:', error)
  } else {
    setAlimentos((prev) => prev.filter((a) => a.id !== id))
  }
}

        
            return (
  <li key={alimento.id} style={estilo}>
    {editandoId === alimento.id ? (
      <div>
        <input
          type="text"
          value={editForm.nome}
          onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
        />
        <input
          type="date"
          value={editForm.validade}
          onChange={(e) => setEditForm({ ...editForm, validade: e.target.value })}
        />
        <input
          type="text"
          value={editForm.local}
          onChange={(e) => setEditForm({ ...editForm, local: e.target.value })}
        />
        <button onClick={() => salvarEdicao(alimento.id)}>Salvar</button>
        <button onClick={() => setEditandoId(null)}>Cancelar</button>
      </div>
    ) : (
      <>
        <strong>{alimento.nome}</strong> — vence em{' '}
        {validade.toLocaleDateString()} ({alimento.local})
        <button onClick={() => iniciarEdicao(alimento)} style={{ marginLeft: '10px' }}>
          Editar
        </button>
        <button onClick={() => excluirAlimento(alimento.id)} style={{ color: 'red', marginLeft: '5px' }}>
          Excluir
        </button>
      </>
    )}
  </li>
)

})}

        </ul>
      )}
    </div>
  )
}
