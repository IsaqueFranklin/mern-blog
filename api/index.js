const express = require('express');
const cors = require('cors');
const app = express();

app.post('/cadastro', (req, res) => {
    res.json('Servidor rodando!')
})

app.listen(4000);