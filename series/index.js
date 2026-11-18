const express = require('express')
const app = express()
app.use(express.json())

let id = 1

const series = {}

app.post("/series", (req, res) => {

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

    id++

    res.status(201).send(series[id])
})

app.get("/series", function(req, res) {
    res.json(series)
})

const port = 4000
app.listen(port, () => console.log(`Séries. Porta ${port}.`))