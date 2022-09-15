import express, { response } from "express";

const app = express()

app.get('/games', (request, response ) => {
    return response.json([])
});

app.post('/ads', (request, response ) => {
    return response.status(201).json([])
});

app.get('/games/:id/ads', (request, response) => {
    //const gameId = request.params.id;
   
    return response.json([
        { id: 1, name: 'Anuncio 1' },
        { id: 2, name: 'Anuncio 2' },
        { id: 3, name: 'Anuncio 3' },
        { id: 4, name: 'Anuncio 4' },
        { id: 5, name: 'Anuncio 5' },
    ])
    console.log("Acessou Ads!")
})

app.get('/ads/:id/discord', (request, response) => {
    //const adId = request.params.id;
   
    return response.json([])
    console.log("Acessou Ads!")
})

app.listen(3333)

//HTTP methods - API restful - HTTP Codes
//GET, POST, PUT, PATCH, DELETE
//request - buscar info que tá vindo com a requisiçao
//response - devolver uma resposta
//3 tipos de parâmetros: 
    //query - (persistir estado - filtros, paginação, etc - disponiveis nas urls, nomeados)
    //route - (identificação de um recurso, como um ID, não nomeados)
    //body - (geralmente pra criação de algo, nao fica na URL, pra info sensiveis)