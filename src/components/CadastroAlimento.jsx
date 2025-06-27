import { useState } from 'react'
import { supabase } from '../lib/supabase'

// Simulação de IA: estima a validade com base em regras "inteligentes"
function estimarValidadeComIA(nome, local, fabricacao) {
  // Base de dados simplificada para simular conhecimento de IA
  const base = [
    { nome: 'presunto', local: 'geladeira', dias: 7 },
    { nome: 'carne', local: 'freezer', dias: 30 },
    { nome: 'leite', local: 'geladeira', dias: 5 },
    { nome: 'fruta', local: 'geladeira', dias: 6 },
    { nome: 'arroz', local: 'armário', dias: 180 },
    { nome: 'pão', local: 'armário', dias: 5 }
  ]

  const n = nome.trim().toLowerCase()
  const l = local.trim().toLowerCase()

  const regra = base.find(r => n.includes(r.nome) && l.includes(r.local))
  if (!regra) return ''

  const dataFab = new Date(fabricacao)
  dataFab.setDate(dataFab.getDate() + regra.dias)

  return dataFab.toISOString().slice(0, 10) // Formato: YYYY-MM-DD
}

// Componente principal de cadastro
export default function CadastroAlimento({ onAlimentoAdicionado }) {
  const [nome, setNome] = useState('')
  const [validade, setValidade] = useState('')
  const [fabricacao, setFabricacao] = useState('')
  const [local, setLocal] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Calcula validade automaticamente se não for informada
    let validadeFinal = validade
    if (!validadeFinal && fabricacao) {
      validadeFinal = estimarValidadeComIA(nome, local, fabricacao)
      if (!validadeFinal) {
        setMensagem('Não foi possível estimar a validade. Informe manualmente.')
        return
      }
    }

    // Envia para Supabase
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

      // Atualiza a lista no App
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

        {/* Local */}
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

      {/* Mensagem de retorno */}
      {mensagem && <p>{mensagem}</p>}
    </div>
  )
}
