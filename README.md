# 🐺 FURIA Tech Bot

Chatbot da FURIA Esports que responde dúvidas dos fãs usando dados da HLTV, além de mostrar links úteis como a loja oficial e até memes 😄

## 🚀 Funcionalidades

- 🧠 Responde perguntas sobre:
  - Próximo jogo da FURIA
  - Loja oficial
  - Memes e curiosidades
- 🔄 Integração com a HLTV para buscar partidas futuras
- 💬 Interface simples com React + Tailwind

## 📁 Estrutura do Projeto

/furiatech
├── public/
├── src/
│ ├── assets/ → Logos e imagens
│ ├── components/ → Componentes da interface (Chat, Botão, etc)
│ ├── App.jsx → App principal
│ └── main.jsx → Entrada do React
├── server.js → Servidor Node.js (API HLTV e rotas)
├── tailwind.config.js → Configuração Tailwind
├── vite.config.js → Configuração do Vite
└── README.md → Este arquivo!

markdown
Copiar
Editar

## 🛠️ Tecnologias

- React + Vite
- Tailwind CSS
- Node.js + Express
- Axios
- [HLTV API Wrapper](https://www.npmjs.com/package/hltv)

## ▶️ Como rodar

1. **Instale as dependências:**

```bash
npm install
Inicie o servidor:

bash
Copiar
Editar
node server.js
Inicie o frontend:

bash
Copiar
Editar
npm run dev
Acesse no navegador:
http://localhost:5173

🧪 Exemplos de perguntas:
Qual o próximo jogo?

Me mostra a loja

Tem meme da furia?


✍️ Autor
Feito por Pedro Felix — 2025
Projeto pessoal de estudo e demonstração com muito 💜 pela FURIA.
```
