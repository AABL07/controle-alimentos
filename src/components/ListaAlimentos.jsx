import { useState } from "react"
import { supabase } from "../lib/supabase"

// Componente que exibe a lista de alimentos
export default function ListaAlimentos({ alimentos, setAlimentos }) {
  const [busca, setBusca] = useState("")
  const [filtroLocal, setFiltroLocal] = useState("")
  const [editandoId, setEditandoId] = useState(null)
  const [editForm, setEditForm] = useState({
    nome: "",
    fabricacao: "",
    validade: "",
    local: "",
  })

  // Formata data para DD/MM/AAAA
  const formatarData = (dataStr) => {
    const partes = dataStr.split("-")
    return `${partes[2]}/${partes[1]}/${partes[0]}`
  }

  // Calcula dias restantes até a validade
  const calcularDiasRestantes = (dataStr) => {
    const validade = new Date(dataStr + "T12:00:00")
    const hoje = new Date()
    const diffTime = validade - hoje
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Inicia o modo de edição
  const iniciarEdicao = (alimento) => {
    setEditandoId(alimento.id)
    setEditForm({
      nome: alimento.nome,
      fabricacao: alimento.fabricacao,
      validade: alimento.validade,
      local: alimento.local,
    })
  }

  // Salva edições no Supabase e atualiza a lista local
  const salvarEdicao = async (id) => {
    const { error } = await supabase
      .from("alimentos")
      .update(editForm)
      .eq("id", id)

    if (!error) {
      setAlimentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...editForm } : a))
      )
      setEditandoId(null)
    }
  }

  // Exclui alimento do Supabase e atualiza lista local
  const excluirAlimento = async (id) => {
    const { error } = await supabase.from("alimentos").delete().eq("id", id)

    if (!error) {
      setAlimentos((prev) => prev.filter((a) => a.id !== id))
    }
  }

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Lista de Alimentos</h2>

      {/* 🔍 Filtros de busca e local */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <select
          value={filtroLocal}
          onChange={(e) => setFiltroLocal(e.target.value)}
          style={{ padding: "6px" }}
        >
          <option value="">Todos os locais</option>
          <option value="Geladeira">Geladeira</option>
          <option value="Freezer">Freezer</option>
          <option value="Armário">Armário</option>
        </select>

        <button
          onClick={() => {
            setBusca("")
            setFiltroLocal("")
          }}
          style={{
            marginLeft: "10px",
            padding: "6px 12px",
            backgroundColor: "#ccc",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Limpar filtros
        </button>
      </div>

      {/* 🧾 Lista de alimentos filtrada */}
      {alimentos.length === 0 ? (
        <p>Nenhum alimento cadastrado.</p>
      ) : (
        <ul>
          {alimentos
            .filter((alimento) => {
              const nomeIncluiBusca = alimento.nome
                .toLowerCase()
                .includes(busca.toLowerCase())
              const localBate =
                filtroLocal === "" || alimento.local === filtroLocal
              return nomeIncluiBusca && localBate
            })
            .map((alimento) => {
              const diasRestantes = calcularDiasRestantes(alimento.validade)
              let estilo = {}

              if (diasRestantes < 0) estilo = { color: "red" }
              else if (diasRestantes <= 3) estilo = { color: "orange" }

              return (
                <li key={alimento.id} style={estilo}>
                  {editandoId === alimento.id ? (
                    <div>
                      <input
                        type="text"
                        value={editForm.nome}
                        onChange={(e) =>
                          setEditForm({ ...editForm, nome: e.target.value })
                        }
                      />
                      <input
                        type="date"
                        value={editForm.fabricacao}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            fabricacao: e.target.value,
                          })
                        }
                      />
                      <input
                        type="date"
                        value={editForm.validade}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            validade: e.target.value,
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
                      <strong>{alimento.nome}</strong> — fabricado em{" "}
                      {formatarData(alimento.fabricacao)}, vence em{" "}
                      {formatarData(alimento.validade)} ({alimento.local})
                      <button
                        onClick={() => iniciarEdicao(alimento)}
                        style={{ marginLeft: "10px" }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirAlimento(alimento.id)}
                        style={{ color: "red", marginLeft: "5px" }}
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
