// Importa o modo estrito do React para ajudar a detectar problemas de código
import { StrictMode } from 'react'

// Importa a função para renderizar a aplicação React na DOM
import { createRoot } from 'react-dom/client'

// Importa o arquivo de estilos globais
import './index.css'

// Importa o componente principal da aplicação
import App from './App.jsx'

// Faz o React renderizar o componente <App /> dentro do elemento com id="root" no index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
