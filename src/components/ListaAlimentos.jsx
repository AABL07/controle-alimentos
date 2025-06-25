// Importa os hooks useEffect e useState do React
import { useEffect, useState } from "react";

// Importa a conexão com o Supabase
import { supabase } from "../lib/supabase";

// Componente principal

export default function ListaAlimentos() {
  // Estados principais do componente
  const [alimentos, setAlimentos] = useState([]); // Lista de alimentos
  const [carregando, setCarregando] = useState(true); // Controle de loading
  const [busca, setBusca] = useState(""); // Texto de busca
  const [filtroLocal, setFiltroLocal] = useState(""); // Filtro por local
  const [editandoId, setEditandoId] = useState(null); // ID do item em edição
  const [editForm, setEditForm] = useState({
    // Dados do formulário de edição
    nome: "",
    fabricacao: "",
    validade: "",
    local: "",
  });

  // Função auxiliar: formata a data no padrão brasileiro (DD/MM/AAAA)
  const formatarData = (dataStr) => {
    const partes = dataStr.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  // Função auxiliar: calcula os dias restantes até a validade
  // Adiciona 'T12:00:00' para evitar problemas com fuso horário (UTC vs local)
  const calcularDiasRestantes = (dataStr) => {
    const validade = new Date(dataStr + "T12:00:00");
    const hoje = new Date();
    const diffTime = validade - hoje;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // useEffect: busca os alimentos do Supabase ao carregar a tela
  useEffect(() => {
    const buscarAlimentos = async () => {
      const { data, error } = await supabase
        .from("alimentos")
        .select("*")
        .order("validade", { ascending: true }); // ordena pela data mais próxima

      if (error) {
        console.error("Erro ao buscar alimentos:", error);
      } else {
        setAlimentos(data);
      }

      setCarregando(false);
    };

    buscarAlimentos();
  }, []);

  // Inicia o modo de edição com os dados atuais do alimento
  const iniciarEdicao = (alimento) => {
    setEditandoId(alimento.id);
    setEditForm({
      nome: alimento.nome,
      fabricacao: alimento.fabricacao,
      validade: alimento.validade,
      local: alimento.local,
    });
  };

  // Salva a edição no Supabase e atualiza o item na lista local
  const salvarEdicao = async (id) => {
    const { error } = await supabase
      .from("alimentos")
      .update(editForm)
      .eq("id", id);

    if (!error) {
      setAlimentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...editForm } : a))
      );
      setEditandoId(null);
    }
  };

  // Exclui um alimento da base de dados e remove da lista
  const excluirAlimento = async (id) => {
    const { error } = await supabase.from("alimentos").delete().eq("id", id);

    if (!error) {
      setAlimentos((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Lista de Alimentos</h2>

      {/* Área de filtro por nome e local */}
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

        {/* Botão para limpar os filtros aplicados */}
        <button
          onClick={() => {
            setBusca("");
            setFiltroLocal("");
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

      {/* Exibe mensagem de carregamento ou lista filtrada */}
      {carregando ? (
        <p>Carregando...</p>
      ) : alimentos.length === 0 ? (
        <p>Nenhum alimento cadastrado.</p>
      ) : (
        <ul>
          {/* Filtra os alimentos por nome e local */}
          {alimentos
            .filter((alimento) => {
              const nomeIncluiBusca = alimento.nome
                .toLowerCase()
                .includes(busca.toLowerCase());
              const localBate =
                filtroLocal === "" || alimento.local === filtroLocal;
              return nomeIncluiBusca && localBate;
            })

            // Renderiza cada item da lista
            .map((alimento) => {
              const diasRestantes = calcularDiasRestantes(alimento.validade);

              // Define o estilo com base no vencimento
              let estilo = {};
              if (diasRestantes < 0) {
                estilo = { color: "red" }; // alimento vencido
              } else if (diasRestantes <= 3) {
                estilo = { color: "orange" }; // alimento perto de vencer
              }

              return (
                <li key={alimento.id} style={estilo}>
                  {editandoId === alimento.id ? (
                    // Modo de edição (inputs para alterar os dados)
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
                    // Modo normal (exibe dados com botões Editar/Excluir)
                    <>
                      <strong>{alimento.nome}</strong> — vence em{" "}
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
              );
            })}
        </ul>
      )}
    </div>
  );
}
