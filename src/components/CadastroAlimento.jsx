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

// Componente principal
export default function CadastroAlimento({ onAlimentoAdicionado }) {
  const [nome, setNome] = useState('')
  const [validade, setValidade] = useState('')
  const [fabricacao, setFabricacao] = useState('')
  const [local, setLocal] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Calcula a validade automaticamente se estiver vazia
    let validadeFinal = validade
    if (!validadeFinal && fabricacao) {
      validadeFinal = calcularValidadeAutomatica(nome, local, fabricacao)
      if (!validadeFinal) {
        setMensagem('Não foi possível sugerir validade automaticamente. Informe manualmente.')
        return
      }
    }

    // Insere no Supabase
    const { data, error } = await supabase.from('alimentos').insert([
      { nome, validade: validadeFinal, fabricacao, local }
    ]).select()

    if (error) {
      console.error(error)
      setMensagem('Erro ao cadastrar alimento.')
    } else {
      setMensagem('Alimento cadastrado com sucesso!')
      setNome('')
      setValidade('')
      setFabricacao('')
      setLocal('')

      // Atualiza a lista no componente pai (App)
      if (data && data.length > 0) {
        onAlimentoAdicionado(data[0])
      }
    }
  }

  return (
    <div>
      <h2>Cadastrar Alimento</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do alimento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        /><br />

        <input
          type="date"
          placeholder="Data de fabricação"
          value={fabricacao}
          onChange={(e) => setFabricacao(e.target.value)}
          required
        /><br />

        <input
          type="date"
          placeholder="Data de validade (opcional)"
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
        /><br />

        <input
          type="text"
          placeholder="Local (ex: Geladeira)"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          required
        /><br />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  )
}
