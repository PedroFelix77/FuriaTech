import express from "express";
import cors from "cors";
import { Agent as HttpsAgent } from "https";
import { gotScraping } from "got-scraping";
import { HLTV } from "hltv";
import axios from "axios";
import * as cheerio from "cheerio";
import { error } from "console";
import { text } from "stream/consumers";
import { Message } from "discord.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
const PORT = 3001;

const httpAgent = new HttpsAgent();

const loadPage = async (url) => {
  const { body } = await gotScraping({ url, agent: { https: httpAgent } });
  return body;
};

app.get("/api/furia/proximos-jogos", async (req, res) => {
  try {
    const matches = await HLTV.getMatches({ teamIds: [8297] });

    if (!matches || matches.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum jogo da FURIA encontrado" });
    }

    const nextGame = matches.find(
      (match) => match.date && match.date > Date.now()
    );

    const adversary =
      nextGame.team1?.id === 8297 ? nextGame.team2?.name : nextGame.team1?.name;
    if (!nextGame) {
      return res
        .status(404)
        .json({ message: "Nenhum jogo futuro com data definida." });
    }

    const horario = new Date(nextGame.date).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    res.json({
      adversary: adversary,
      torneio: nextGame.event.name,
      horario: horario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.get("/api/furia/jogadores", async (req, res) => {
  try {
    const furiaPlayers = [
      "KSCERATO",
      "Fallen",
      "Yekindar",
      "Molodoy",
      "Yuurih",
    ];
    const players = [];

    for (const nickname of furiaPlayers) {
      const playerInfo = await HLTV.getPlayerByName({ name: nickname });
      players.push({
        nickname: nickname,
        name: playerInfo.name,
        age: playerInfo.age,
        country: playerInfo.country.name,
        team: playerInfo.team?.name || "Sem time",
      });
    }
    res.json({ furiaPlayers: players });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar jogador" });
  }
});

app.get("/api/furia/ultimo-resultado", async (req, res) => {
  try {
    const result = await HLTV.getResults();

    const furiaGames = result.filter(
      (match) =>
        (match.team1 && match.team1.id === 8297) ||
        (match.team2 && match.team2.id === 8297)
    );

    if (furiaGames.length === 0) {
      return res.json({ error: "Nenhum resultado encontrado" });
    }

    const lastResult = furiaGames[0];

    let adversary = "";
    let scoreboard = "";

    if (lastResult.team1.id === 8297) {
      adversary = lastResult.team2.name;

      scoreboard = `FURIA ${lastResult.team1Result} x ${lastResult.team2Result} ${adversary}`;
    } else {
      adversary = lastResult.team1.name;

      scoreboard = `${adversary} ${lastResult.team1Result} x ${lastResult.team2Result} FURIA`;
    }

    const data = new Date(lastResult.date).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

    res.json({
      partida: scoreboard,
      torneio: lastResult.event.name,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar último resultado" });
  }
});

app.get("/api/furia/loja", (req, res) => {
  const loja = {
    link: "https://www.furia.gg/",
  };
  res.json({ loja });
});

app.get("/api/furia/memes", (req, res) => {
  res.json({ memes });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
