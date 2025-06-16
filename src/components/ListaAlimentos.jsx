// Importa os hooks useEffect e useState do React
import { useEffect, useState } from 'react'

// Importa a conexão com o Supabase
import { supabase } from '../lib/supabase'

// Componente principal
export default function ListaAlimentos() {
  // Estado para armazenar os alimentos vindos do banco
  const [alimentos, setAlimentos] = useState([])

  // Estado para controlar o carregamento inicial
  const [carregando, setCarregando] = useState(true)

  // Estado para busca por nome
  const [busca, setBusca] = useState('')

  // Estado para filtro por local (ex: Geladeira, Freezer)
  const [filtroLocal, setFiltroLocal] = useState('')

  // Estado para controlar qual alimento está sendo editado
  const [editandoId, setEditandoId] = useState(null)

  // Estado para armazenar os dados do formulário de edição
  const [editForm, setEditForm] = useState({
    nome: '',
    validade: '',
    local: ''
  })

  // useEffect para buscar os alimentos assim que o componente carregar
  useEffect(() => {
    const buscarAlimentos = async () => {
      const { data, error } = await supabase
        .from('alimentos')
        .select('*')
        .order('validade', { ascending: true }) // Ordena por data de validade

      if (error) {
        console.error('Erro ao buscar alimentos:', error)
      } else {
        setAlimentos(data)
      }

      setCarregando(false)
    }

    buscarAlimentos()
  }, [])

  // Função para iniciar o modo edição de um alimento
  const iniciarEdicao = (alimento) => {
    setEditandoId(alimento.id)
    setEditForm({
      nome: alimento.nome,
      validade: alimento.validade,
      local: alimento.local
    })
  }

  // Função para salvar as edições no Supabase
  const salvarEdicao = async (id) => {
    const { error } = await supabase
      .from('alimentos')
      .update(editForm)
      .eq('id', id)

    if (error) {
      console.error('Erro ao editar:', error)
    } else {
      // Atualiza a lista local sem precisar recarregar a página
      setAlimentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...editForm } : a))
      )
      setEditandoId(null) // Sai do modo edição
    }
  }

  // Função para excluir um alimento
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
    <div style={{ marginTop: '40px' }}>
      <h2>Lista de Alimentos</h2>

      {/* 🔍 Área de busca e filtro */}
      <div style={{ marginBottom: '20px' }}>
        {/* Campo de busca por nome */}
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ marginRight: '10px', padding: '6px' }}
        />

        {/* Filtro por local */}
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

        {/* Botão para limpar os filtros */}
        <button
          onClick={() => {
            setBusca('')
            setFiltroLocal('')
          }}
          style={{
            marginLeft: '10px',
            padding: '6px 12px',
            backgroundColor: '#ccc',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Limpar filtros
        </button>
      </div>

      {/* 📋 Lista de alimentos */}
      {carregando ? (
        <p>Carregando...</p>
      ) : alimentos.length === 0 ? (
        <p>Nenhum alimento cadastrado.</p>
      ) : (
        <ul>
          {alimentos
            // Filtra alimentos pelo nome e local
            .filter((alimento) => {
              const nomeIncluiBusca = alimento.nome
                .toLowerCase()
                .includes(busca.toLowerCase())
              const localBate =
                filtroLocal === '' || alimento.local === filtroLocal
              return nomeIncluiBusca && localBate
            })
            .map((alimento) => {
              const hoje = new Date()
              const validade = new Date(alimento.validade)
              const diasRestantes = Math.ceil(
                (validade - hoje) / (1000 * 60 * 60 * 24)
              )

              let estilo = {}
              // Definindo cor de texto com base na validade
              if (diasRestantes < 0) {
                estilo = { color: 'red' } // Vencido
              } else if (diasRestantes <= 3) {
                estilo = { color: 'orange' } // Vencendo em breve
              }

              return (
                <li key={alimento.id} style={estilo}>
                  {/* Se o alimento está em edição */}
                  {editandoId === alimento.id ? (
                    <div>
                      {/* Campos de edição */}
                      <input
                        type="text"
                        value={editForm.nome}
                        onChange={(e) =>
                          setEditForm({ ...editForm, nome: e.target.value })
                        }
                      />
                      <input
                        type="date"
                        value={editForm.validade}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            validade: e.target.value
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editForm.local}
                        onChange={(e) =>
                          setEditForm({ ...editForm, local: e.target.value })
                        }
                      />
                      <button onClick={() => salvarEdicao(alimento.id)}>
                        Salvar
                      </button>
                      <button onClick={() => setEditandoId(null)}>
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Exibição normal */}
                      <strong>{alimento.nome}</strong> — vence em{' '}
                      {validade.toLocaleDateString()} ({alimento.local})
                      <button
                        onClick={() => iniciarEdicao(alimento)}
                        style={{ marginLeft: '10px' }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirAlimento(alimento.id)}
                        style={{ color: 'red', marginLeft: '5px' }}
                      >
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
