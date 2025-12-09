🍎 Controle de Alimentos - Sistema Inteligente de Validade

Aplicação web full stack para gerenciar alimentos domésticos com sugestão automática de prazo de consumo, reduzindo desperdício alimentar e promovendo sustentabilidade.

[Netlify Status](https://controle-alimentos.vercel.app)

License:

<img width="82" height="20" alt="image" src="https://github.com/user-attachments/assets/61e83d51-fe12-4550-8422-53862293ef3b" />

<img width="81" height="20" alt="image" src="https://github.com/user-attachments/assets/6e9fb66d-221a-48ba-9be6-e95cf72de420" />

<img width="89" height="20" alt="image" src="https://github.com/user-attachments/assets/e4c84356-a6fd-4316-ab9a-5a786cd61bc6" />

<img width="147" height="20" alt="image" src="https://github.com/user-attachments/assets/06f075ca-6889-441a-b332-597846b24cb9" />


📋 Sobre o Projeto

Controle de Alimentos é um sistema web responsivo para controle de alimentos com registro de validade, local de armazenamento (geladeira, freezer, armário, etc.) e funcionalidades para alerta e organização inteligente.

Desenvolvido como Atividade Extensionista Oficial no curso de Análise e Desenvolvimento de Sistemas (UNINTER), está alinhado com os Objetivos de Desenvolvimento Sustentável (ODS) 03 (Saúde e bem-estar), 12 (Consumo e produção responsáveis) e 13 (Ação contra a mudança global do clima).

🎯 Objetivo Principal

Ajudar famílias a organizar e monitorar alimentos armazenados, evitando desperdício e promovendo consumo consciente através de:

Cadastro inteligente de alimentos

Sugestão automática de data de validade

Alertas visuais para itens próximos do vencimento

Organização por local de armazenamento

Filtros e busca avançada

✨ Funcionalidades Principais

✅ Gerenciamento de Alimentos

📝 Cadastro completo: Nome do alimento, local de armazenamento, data de fabricação

✏️ Edição: Atualizar informações de alimentos cadastrados

🗑️ Exclusão: Remover alimentos da lista

📍 Categorização: Organize por local (geladeira, armário, freezer)

🧠 Sugestão Inteligente de Validade

🤖 IA Simulada: Calcula automaticamente data de vencimento baseada em:

Tipo de alimento

Data de fabricação

Padrões de conservação conhecidos

📊 Organização e Alertas

📅 Ordenação automática: Alimentos organizados por data de vencimento

🔴 Alertas visuais:

Vermelho: Alimento vencido

Amarelo: Próximo de vencer (3-5 dias)

Verde: Seguro para consumo

🔍 Filtros avançados: Busque alimentos por nome ou local

🌓 Acessibilidade

🌙 Tema claro/escuro: Alterna para melhor conforto visual e acessibilidade

♿ Compatibilidade WCAG: Desenvolvido com foco em acessibilidade

📱 Responsivo: Funciona perfeitamente em desktop, tablet e mobile

🛠️ Tecnologias

Frontend

```
React 18              - Biblioteca de UI moderna
Vite                  - Build tool rápido e otimizado
Tailwind CSS          - Framework de estilização utilitário
JavaScript ES6+       - Linguagem de programação
```

Backend & Banco de Dados

```

Supabase              - BaaS (Backend-as-a-Service)
  ├─ PostgreSQL       - Banco de dados relacional robusto
  ├─ API REST         - Endpoints para CRUD completo
  └─ Realtime         - Atualizações em tempo real
```
  
DevOps & Deploy
```
Vercel                - Hospedagem e deploy contínuo
GitHub                - Versionamento e controle de código
Git                   - Sistema de controle de versão
```

Metodologia & Design
```
Kanban (Trello)       - Gerenciamento ágil de tarefas
UML                   - Diagrama de Casos de Uso e Classes
Figma                 - Design e prototipagem (conceitual)
```

🚀 Como Rodar o Projeto

📋 Pré-requisitos

Antes de começar, você precisa ter:

Node.js 16.0 ou superior (Download)

npm ou yarn (geralmente vem com Node.js)

Conta Supabase gratuita (Criar conta)

Git instalado (Download)

💾 Instalação

1. Clone o repositório

```
git clone https://github.com/AABL07/controle-alimentos.git
cd controle-alimentos
```

2. Instale as dependências

```
npm install
```
ou com yarn:

```
yarn install
```

3.Configure variáveis de ambiente

Crie um arquivo .env.local na raiz do projeto:

```
cp .env.example .env.local
Preencha com suas credenciais Supabase:
```

```text
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```
```
⚠️ Importante: Nunca commite o .env.local. Use .env.example apenas para referência.
```

4.Configure o banco de dados Supabase (Opcional - estrutura básica)

Execute as migrations SQL no console Supabase:

```sql
-- Criar tabela de alimentos
CREATE TABLE alimentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  local VARCHAR(50) NOT NULL,
  data_fabricacao DATE NOT NULL,
  data_vencimento DATE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para performance
CREATE INDEX idx_alimentos_vencimento ON alimentos(data_vencimento);
```

▶️ Rodando Localmente
```bash
npm run dev
A aplicação abrirá em: http://localhost:5173
```

💡 Vite oferece hot reload automático. Qualquer mudança é refletida instantaneamente!

🔨 Construir para Produção

```bash
npm run build
Gera pasta dist/ otimizada pronta para deploy.
```

Visualizar build localmente:

```bash
npm run preview
```

📦 Estrutura do Projeto
```text
controle-alimentos/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── AlimentoForm.jsx
│   │   ├── AlimentoList.jsx
│   │   └── AlimentoCard.jsx
│   ├── pages/              # Páginas principais
│   │   └── Home.jsx
│   ├── services/           # Integração com APIs
│   │   └── supabaseClient.js
│   ├── styles/             # Estilos globais
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── public/                 # Assets estáticos
├── .env.example           # Variáveis de ambiente (exemplo)
├── vite.config.js         # Configuração Vite
├── tailwind.config.js     # Configuração Tailwind CSS
├── package.json
├── package-lock.json
└── README.md
```

📊 Metodologia de Desenvolvimento

Desenvolvido com Kanban usando Trello, dividido em 4 Sprints:

Sprint 1: Setup e Arquitetura (Semana 1)

✅ Configuração do projeto com Vite + React

✅ Estrutura base de componentes

✅ Setup inicial do Supabase

Sprint 2: Implementação CRUD (Semana 2)

✅ Implementação do cadastro com Supabase

✅ Listagem de alimentos em tempo real

✅ Edição e exclusão de itens

Sprint 3: Ordenação e Filtros (Semana 3)

✅ Ordenação automática por data de vencimento

✅ Filtros por local de armazenamento

✅ Busca avançada por nome

✅ Interface de alertas visuais

Sprint 4: Lógica Inteligente (Semana 4)

✅ Implementação da "IA simulada" para sugestão de validade

✅ Tema claro/escuro

✅ Responsividade mobile

✅ Testes e refinamentos

📐 Diagramas UML

Diagrama de Casos de Uso
```text
Usuário
  │
  ├─► Cadastrar Alimento
  ├─► Editar Alimento
  ├─► Excluir Alimento
  ├─► Visualizar Lista
  ├─► Filtrar por Local
  └─► Receber Alertas de Vencimento
```
Diagrama de Classes
```text
Alimento
  ├─ id: UUID
  ├─ nome: String
  ├─ local: String
  ├─ data_fabricacao: Date
  ├─ data_vencimento: Date
  ├─ criado_em: Timestamp
  └─ atualizado_em: Timestamp

Métodos:
  ├─ criar()
  ├─ atualizar()
  ├─ deletar()
  ├─ obterPorLocal()
  └─ calcularValidade()
```

💡 Conceitos Técnicos Implementados

Frontend
✅ React Hooks: useState, useEffect, useContext para gerenciamento de estado

✅ Componentes Funcionais: Arquitetura moderna baseada em funções

✅ Conditional Rendering: Renderização condicional de elementos

✅ CSS Responsivo: Flexbox, Grid, Media Queries

✅ Acessibilidade: Aria labels, alt text, navegação por teclado

Backend
✅ API REST: Endpoints para CRUD completo

✅ Realtime Subscriptions: Atualizações ao vivo com Supabase

✅ Autenticação: Estrutura preparada para integração de autenticação

✅ Segurança: Row Level Security (RLS) no banco

DevOps
✅ Versionamento Git: Commits descritivos e branching

✅ Deploy Contínuo: Automatizado via Vercel

✅ Environment Variables: Configuração segura de credenciais

✅ Performance: Otimização automática pelo Vite

🎓 O que Aprendeu
Desenvolvimento deste projeto proporcionou aprendizado profundo em:

Arquitetura e Design
Integração full stack com Backend-as-a-Service (BaaS)

Design de APIs RESTful

Modelagem de dados relacional

Padrões de componentes reutilizáveis

Desenvolvimento Frontend
Gerenciamento eficiente de estado com React

Responsividade mobile-first

Acessibilidade segundo WCAG 2.1

Performance e otimizações

Metodologia e Processo
Kanban com Sprints: Organização eficiente de tarefas

UX Design: Importância de pensar na experiência do usuário desde o início

Documentação: Clareza na comunicação técnica

Versionamento Git: Workflow profissional com commits descritivos

Ferramentas Profissionais
Vite para build otimizado e desenvolvimento rápido

Supabase como alternativa moderna a backends tradicionais

Vercel para deploy zero-config

Trello para organização visual de projetos

📱 Screenshots
Desktop - Tema Claro
```text
[Adicione screenshot do desktop em tema claro aqui]
```
Desktop - Tema Escuro
```text
[Adicione screenshot do desktop em tema escuro aqui]
```
Mobile
```text
[Adicione screenshot do mobile aqui]
```

🌍 ODS (Objetivos de Desenvolvimento Sustentável)

Este projeto está alinhado com:

ODS|Objetivo|Como Contribui
03 |Saúde e bem-estar |Previne consumo de alimentos vencidos
12 |Consumo e produção responsáveis |Reduz desperdício alimentar doméstico
13 |Ação contra a mudança global do clima |Menos desperdício = menor impacto ambiental

🔐 Segurança

Práticas Implementadas
✅ Variáveis de ambiente para credenciais sensíveis

✅ .env.local no .gitignore (nunca commitar senhas)

✅ Row Level Security (RLS) no Supabase

✅ HTTPS em produção via Vercel

✅ Validação de entrada no frontend

Recomendações para Produção

Implementar autenticação de usuários com OAuth

Adicionar rate limiting em APIs

Usar tokens JWT para autorização

Regular security audits com ferramentas como Snyk

🐛 Melhorias Futuras

 Autenticação de usuários com OAuth

 Sugestão de receitas baseada em alimentos próximos do vencimento

 Integração com APIs de dados nutricionais

 Notificações push para alimentos próximos do vencimento

 Sistema de compartilhamento entre membros da família

 Histórico de consumo e geração de relatórios

 Dark mode com persistência em localStorage

 Exportar dados em CSV/PDF

 Integração com código de barras para cadastro rápido

📚 Referências e Recursos

[Documentação Oficial](https://react.dev/)

[Vite Guide](https://vitejs.dev/)

[Supabase Docs](https://supabase.com/docs)

[Tailwind CSS](https://tailwindcss.com/docs)

[Vercel Deployment](https://vercel.com/docs)

Artigos e Guias

[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

[REST API Best Practices](https://restfulapi.net/)

[Web Performance Optimization](https://web.dev/performance/)

Comunidades

[React Community](https://react.dev/community)

[JavaScript Brasil](https://braziljs.org/)

[Dev.to](https://dev.to/)

📄 Licença

Este projeto é disponibilizado sob a licença MIT. Veja arquivo LICENSE para detalhes.

Essencialmente, você pode:

✅ Usar comercialmente

✅ Modificar o código

✅ Distribuir

✅ Usar privadamente

Mas deve:

📋 Incluir a licença e aviso de copyright

🤝 Contribuindo


Contribuições são bem-vindas! Se encontrou um bug ou tem uma sugestão de melhoria:

✅Faça um Fork do projeto

✅Crie uma branch para sua feature (git checkout -b feature/MinhaFeature)

✅Commit suas mudanças (git commit -m 'Adiciona MinhaFeature')

✅Push para a branch (git push origin feature/MinhaFeature)

✅Abra um Pull Request

✅Padrões de Código

✅Siga ESLint configuration

✅Use Prettier para formatação

✅Escreva commits descritivos

✅Documente mudanças significativas

👨‍💻 Desenvolvedor

Adriano Antunes Bueno Lucio
Desenvolvedor Full Stack | PCD (TEA)

🔗 GitHub: @AABL07

🔗 LinkedIn: in/adriano-lucio-686256235

📧 Email: adrianojunior577@gmail.com

🌐 Portfolio: controle-alimentos.vercel.app

📞 Suporte

Encontrou um problema? Tem uma dúvida?

📝 Issues: GitHub Issues

💬 Discussões: GitHub Discussions

📧 Email: adrianojunior577@gmail.com

🎓 Documentação Acadêmica

Este projeto foi desenvolvido como Atividade Extensionista Oficial no curso de Tecnólogo em Análise e Desenvolvimento de Sistemas (UNINTER).

Disciplina: Atividade Extensionista - Tecnologia Aplicada à Inclusão Digital

Data de Entrega Final: 27/06/2025

Status: ✅ Completo e em Produção

Documentação oficial disponível em: UNINTER

<div align="center">
    
⭐ Gostou do Projeto? Deixe uma Star! ⭐

Desenvolvido individualmente por Adriano com ❤️

<img width="59" height="20" alt="image" src="https://github.com/user-attachments/assets/4cc84610-4a8f-4cbb-ad53-2be9352032ac" />

<img width="49" height="20" alt="image" src="https://github.com/user-attachments/assets/82055228-4e6c-41ac-8bee-b9dd1b26c17c" />

<img width="81" height="20" alt="image" src="https://github.com/user-attachments/assets/ceab346d-0f2a-44b5-8138-9219558c4643" />

<img width="63" height="20" alt="image" src="https://github.com/user-attachments/assets/c106c17c-6ad5-4b62-85d7-a70b1d709613" />

<img width="73" height="20" alt="image" src="https://github.com/user-attachments/assets/ebb938c1-ce69-41ad-b541-7999f971fe57" />

</div>
