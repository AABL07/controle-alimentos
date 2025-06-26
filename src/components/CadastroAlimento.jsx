import { useState } from 'react'
import { supabase } from '../lib/supabase'

// Tabela com prazos padrão de validade por alimento e local (em dias)
const prazosPadrao = {
  'Presunto|Geladeira': 7,
  'Carne|Freezer': 30,
  'Leite|Geladeira': 5,
  'Fruta|Geladeira': 7,
  'Arroz|Armário': 180,
  'Pão|Armário': 5
}

// Função para calcular a validade com base na fabricação
function calcularValidadeAutomatica(nome, local, fabricacao) {
  const chave = `${nome}|${local}`
  const dias = prazosPadrao[chave]

  if (!dias || !fabricacao) return ''
  const data = new Date(fabricacao)
  data.setDate(data.getDate() + dias)

  return data.toISOString().slice(0, 10) // formato YYYY-MM-DD
}

// Componente de cadastro
export default function CadastroAlimento({ onAlimentoAdicionado }) {
  const [nome, setNome] = useState('')
  const [validade, setValidade] = useState('')
  const [fabricacao, setFabricacao] = useState('')
  const [local, setLocal] = useState('')
  const [mensagem, setMensagem] = useState('')

  // Envia os dados para o Supabase
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Calcula validade se não foi informada
    let validadeFinal = validade
    if (!validadeFinal && fabricacao) {
      validadeFinal = calcularValidadeAutomatica(nome, local, fabricacao)
      if (!validadeFinal) {
        setMensagem('Não foi possível sugerir validade automaticamente. Informe manualmente.')
        return
      }
    }

    // Insere alimento no Supabase
    const { data, error } = await supabase
      .from('alimentos')
      .insert([{ nome, validade: validadeFinal, fabricacao, local }])
      .select()

    if (error) {
      console.error(error)
      setMensagem('Erro ao cadastrar alimento.')
    } else {
      setMensagem('Alimento cadastrado com sucesso!')
      setNome('')
      setValidade('')
      setFabricacao('')
      setLocal('')

      // Atualiza lista no App
      if (data && data.length > 0) {
        onAlimentoAdicionado(data[0])
      }
    }
  }

  return (
    <div>
      <h2>Cadastrar Alimento</h2>
      <form onSubmit={handleSubmit}>

        {/* Nome do alimento */}
        <input
          type="text"
          placeholder="Nome do alimento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        /><br />

        {/* Data de fabricação */}
        <label>
          <span>Data de fabricação:</span><br />
          <input
            type="date"
            value={fabricacao}
            onChange={(e) => setFabricacao(e.target.value)}
            required
          />
        </label><br />

        {/* Data de validade (opcional) */}
        <label>
          <span>Data de validade (opcional):</span><br />
          <input
            type="date"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
          />
        </label><br />

        {/* Local de armazenamento */}
        <input
          type="text"
          placeholder="Local (ex: Geladeira)"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          required
        /><br />

        {/* Botão */}
        <button type="submit">Cadastrar</button>
      </form>

      {/* Mensagem de sucesso ou erro */}
      {mensagem && <p>{mensagem}</p>}
    </div>
  )
}
