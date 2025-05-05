import { useState } from "react";
import axios from "axios";
import furiaLogo from "/src/assets/Furia_Esports_logo.png";

function ChatWindow() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: `Olá, torcedor(a) FURIOSO(A)! 👊🔥
Sou o FURIA Bot, pronto pra te deixar por dentro de tudo.
O que você quer saber?

1️⃣ Próximos Jogos<br>
2️⃣ Jogadores<br>
3️⃣ Último Resultado<br>
4️⃣ Loja Oficial<br>
5️⃣ Memes da FURIA<br>

(Digite o número ou escreva o tema)`,
      sender: "bot",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchFuriaData = async (query) => {
    setIsLoading(true);

    try {
      const normalQuery = query.toLowerCase().trim();
      if (normalQuery.includes("proximo jogo") || normalQuery.includes("1")) {
        const response = await axios.get(
          "http://localhost:3001/api/furia/proximos-jogos"
        );
        const nextMatch = response.data.matches;

        if (nextMatch) {
          return {
            text: `Próximo jogo: FURIA vs ${response.data.adversary}<br>
          <strong>Torneio</strong>: ${response.data.torneio}<br>
          <strong>Horário</strong>: ${response.data.horario}`,
            sender: "bot",
          };
        } else {
          return {
            text: "😢 A FURIA não tem partidas futuras agendadas no momento.\nFique ligado no calendário oficial!",
            sender: "bot",
          };
        }
      }

      if (normalQuery.includes("jogadores") || normalQuery.includes("2")) {
        const response = await axios.get(
          "http://localhost:3001/api/furia/jogadores"
        );

        if (!response.data || !response.data.furiaPlayers) {
          throw new Error("Estrutura de dados inválida");
        }

        const playersList = response.data.furiaPlayers;

        if (playersList && playersList.length) {
          return {
            text: `Lineup completo da FURIA:\n${playersList
              .map(
                (p) =>
                  `<br>• ${p.nickname} (${p.name})<br>` +
                  `  Idade: ${p.age} | País: ${p.country}<br>` +
                  `  Time atual: ${p.team}<br>`
              )
              .join("\n\n")}`,
            sender: "bot",
          };
        } else {
          return {
            text: "😕 Não foi possível carregar o lineup da FURIA no momento.",
            sender: "bot",
          };
        }
      }

      if (
        normalQuery.includes("último resultado") ||
        normalQuery.includes("3")
      ) {
        const response = await axios.get(
          "http://localhost:3001/api/furia/ultimo-resultado"
        );

        const lastMatch = response.data.lastResult;

        if (lastMatch) {
          return {
            text:
              `Último resultado da FURIA:<br>` +
              `🏆 ${response.data.torneio}<br>` +
              `⚔️ ${response.data.partida}<br>` +
              `📅 ${response.data.data} <br>`,
            sender: "bot",
          };
        } else {
          return {
            text: "ℹ️ Nenhum resultado recente encontrado para a FURIA.",
            sender: "bot",
          };
        }
      }

      if (normalQuery.includes("loja") || normalQuery.includes("4")) {
        const response = await axios.get(
          "http://localhost:3001/api/furia/loja"
        );

        const lojaData = response.data.loja;

        if (lojaData && lojaData.link) {
          return {
            text:
              `<strong>•Loja Oficial da FURIA•</strong> <br>` +
              `Acesse: <a href="${lojaData.link}" target="_blank" rel="noopener noreferrer"> ${lojaData.link} </a> <br>` +
              `✅ Produtos exclusivos <br>` +
              `🚀 Envio para todo Brasil <br>`,
            sender: "bot",
          };
        } else {
          return {
            text: "📦 A loja da FURIA está em manutenção no momento. Tente novamente mais tarde!",
            sender: "bot",
          };
        }
      }

      if (normalQuery.includes("memes") || normalQuery.includes("5")) {
        const response = await axios.get(
          "http://localhost:3001/api/furia/loja"
        );

        const memesFuria = response.data.memes;
        if (memesFuria && memesFuria.length > 0) {
          const memeUrl = memesFuria[0];

          return {
            text: `<img src="${memeUrl}" alt="Meme furia" style="max-width: 100%; border-radius: 8px;"`,
            sender: "bot",
          };
        } else {
          return {
            text: "Não temos memes disponiveis no momento. Tente novamente mais tarde",
            sender: "bot",
          };
        }
      }
      return {
        text: "Desculpe, não entendi. Digite o número ou tema listado. ",
        sender: "bot",
      };
    } catch (error) {
      return { text: "Erro ao buscar dados. Tente mais tarde.", sender: "bot" };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setMessage("");

    const botResponse = await fetchFuriaData(message.toLowerCase());
    setMessages((prev) => [...prev, botResponse]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="furia-chat-container chat-window">
      <div className="flex justify-center">
        <img
          src={furiaLogo}
          alt="Logo Furia"
          className="w-12 h-12 object-contain mb-4"
        />
      </div>

      <div className="h-64 overflow-y-scroll mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg mb-2 max-w-[80%] ${
              message.sender === "user"
                ? "bg-blue-500 text-white ml-auto "
                : "bg-gray-200 text-black mr-auto"
            }`}
          >
            <p dangerouslySetInnerHTML={{ __html: message.text }} />
          </div>
        ))}

        {isLoading && (
          <div className="p-3 bg-gray-100 rounded-lg self-start">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex border-t pt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-2 border rounded rounded-l-lg"
          placeholder="Pergunte sobre a FURIACS"
          disabled={isLoading}
        />

        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
