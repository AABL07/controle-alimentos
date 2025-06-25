// Importa o hook useState do React para manipular estados locais
import { useState } from "react";

// Importa a configuração do cliente Supabase (conexão com o banco de dados)
import { supabase } from "../lib/supabase";

// Tabela com prazos típicos de validade (em dias) por alimento e local
const prazosPadrao = {
  "Presunto|Geladeira": 7,
  "Carne|Freezer": 30,
  "Leite|Geladeira": 5,
  "Fruta|Geladeira": 7,
  "Arroz|Armário": 180,
  "Pão|Armário": 5,
};

// Calcula validade com base na data de fabricação + dias definidos
function calcularValidadeAutomatica(nome, local, fabricacao) {
  const chave = `${nome}|${local}`;
  const dias = prazosPadrao[chave];

  if (!dias || !fabricacao) return "";

  const dataFab = new Date(fabricacao);
  dataFab.setDate(dataFab.getDate() + dias);

  return dataFab.toISOString().slice(0, 10); // Formato YYYY-MM-DD
}

// Define o componente CadastroAlimento
export default function CadastroAlimento() {
  // Estados para armazenar os valores dos campos do formulário
  const [nome, setNome] = useState("");
  const [fabricacao, setFabricacao] = useState("");
  const [validade, setValidade] = useState("");
  const [local, setLocal] = useState("");
  const [mensagem, setMensagem] = useState(""); // Estado para mensagens de sucesso ou erro

  // Função que será executada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página ao enviar o form

    // Validação simples para evitar envio de campos vazios ou apenas com espaços
    if (!nome.trim() || !local.trim() || !validade) {
      setMensagem("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Insere os dados na tabela "alimentos" no Supabase
    const { error } = await supabase
      .from("alimentos")
      .insert([{ nome, validade, fabricacao, local }]);

    // Tratamento de erros
    if (error) {
      console.error(error); // Exibe o erro no console do navegador
      setMensagem(`Erro: ${error.message}`); // Mostra a mensagem de erro ao usuário
    } else {
      setMensagem("Alimento cadastrado com sucesso!"); // Mensagem de sucesso
      // Limpa os campos do formulário
      setNome("");
      setValidade("");
      setLocal("");
    }
  };

  return (
    <div>
      <h2>Cadastrar Alimento</h2>

      {/* Formulário de cadastro */}
      <form onSubmit={handleSubmit}>
        {/* Campo: Nome do alimento */}
        <input
          type="text"
          placeholder="Nome do alimento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        {/* Campo: Data de fabricação */}
        <input
          type="date"
          placeholder="Data de fabricação"
          value={fabricacao}
          onChange={(e) => setFabricacao(e.target.value)}
          required
        />
        <br />

        {/* Campo: Data de validade */}
        <input
          type="date"
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
          required
        />
        <br />

        {/* Campo: Local de armazenamento */}
        <input
          type="text"
          placeholder="Local (ex: Geladeira)"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          required
        />
        <br />

        {/* Botão de envio */}
        <button type="submit">Cadastrar</button>
      </form>

      {/* Exibe a mensagem de sucesso ou erro, com cor condicional */}
      {mensagem && (
        <p style={{ color: mensagem.startsWith("Erro") ? "red" : "green" }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}
