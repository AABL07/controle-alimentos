import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function CadastroAlimento() {
  const [nome, setNome] = useState('')
  const [validade, setValidade] = useState('')
  const [local, setLocal] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.from('alimentos').insert([
      { nome, validade, local }
    ])

    if (error) {
      console.error(error)
      setMensagem('Erro ao cadastrar alimento.')
    } else {
      setMensagem('Alimento cadastrado com sucesso!')
      setNome('')
      setValidade('')
      setLocal('')
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
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
          required
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
