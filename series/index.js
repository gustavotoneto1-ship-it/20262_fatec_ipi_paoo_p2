const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

let id = 1

const series = {}

app.post("/series", async (req, res) => {

    const titulo = req.body.titulo
    const plataforma = req.body.plataforma

    if (titulo === undefined || plataforma === undefined || titulo === "" || plataforma === "") {
        return res.status(400).send({
            erro: "título e plataforma são obrigatórios"
        })
    }

    series[id] = {
        id: id,
        titulo: titulo,
        plataforma: plataforma
    }

    const serie = series[id]

    await axios.post('http://localhost:10000/eventos', {
            tipo: 'SerieCriada',
            dados: serie
        })

    id++

    res.status(201).send(serie)
})

app.get("/series", function(req, res) {
    res.json(series)
})

app.post('/eventos', (req, res) => {
    try {
        const evento = req.body
        console.log(evento.tipo)
    } catch(e) {}
    res.end()
})

const port = 4000
app.listen(port, () => console.log(`Séries. Porta ${port}.`))