const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())

const comentariosPorSerieId = {}

app.post("/series/:id/comentarios", (req, res) => {
    const { texto } = req.body

    const comentario = {
        id: uuidv4(),
        texto: texto,
        serieId: req.params.id
    }

    const comentariosDaSerie = comentariosPorSerieId[req.params.id] || []
    comentariosDaSerie.push(comentario)
    comentariosPorSerieId[req.params.id] = comentariosDaSerie
    res.status(201).json(comentariosDaSerie)
})

app.get("/series/:id/comentarios", function(req, res) {
    res.json(comentariosPorSerieId[req.params.id] || [])
})

const port = 4100
app.listen(port, () => console.log(`Comentários. Porta ${port}.`))