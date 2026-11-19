const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const baseConsulta = {}

const funcoes = {
    SerieCriada: (serie) => {
        baseConsulta[serie.id] = serie
        baseConsulta[serie.id]['comentarios'] = []
    },
    ComentarioCriado: (comentario) => {
        const comentarios = baseConsulta[comentario.serieId]['comentarios'] || []
        comentarios.push(comentario)
        baseConsulta[comentario.serieId]['comentarios'] = comentarios
    }
}

app.post('/eventos', function(req, res) {
    try {
        const evento = req.body
        console.log(evento)
        funcoes[evento.tipo](evento.dados)
    } catch(e) {}
    res.end()
})

app.get('/series', (req, res) => {
    res.json(baseConsulta)
})

app.get('/series/:id', (req, res) => {
    if(!baseConsulta[req.params.id]){
        return res.status(404).send({ erro: "série não encontrada" })
    }

    res.json(baseConsulta[req.params.id])
})

const port = 4200
app.listen(port, () => console.log(`Consulta. Porta ${port}.`))