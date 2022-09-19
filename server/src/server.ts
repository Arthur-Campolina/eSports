import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHoursStringToMinutes } from "./utils/convertHoursStringToMinutes";
import { convertMinutesToHourString } from "./utils/convertMinutesToHourString";

const app = express();

app.use(express.json());
// para configurar o cors {origin: 'http://..'}
app.use(cors());

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json([games]);
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHoursStringToMinutes(body.hourStart),
      hourEnd: convertHoursStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json([
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    }),
  ]);
  console.log("Acessou Ads!");
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.json({
    discord: ad.discord,
  });
  console.log("Acessou Ads!");
});

app.listen(3333);

//HTTP methods - API restful - HTTP Codes
//GET, POST, PUT, PATCH, DELETE
//request - buscar info que tá vindo com a requisiçao
//response - devolver uma resposta
//3 tipos de parâmetros:
//query - (persistir estado - filtros, paginação, etc - disponiveis nas urls, nomeados)
//route - (identificação de um recurso, como um ID, não nomeados)
//body - (geralmente pra criação de algo, nao fica na URL, pra info sensiveis)
