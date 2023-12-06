const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcryptjs')
const app = express();
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);
const secret = 'lkanlskfnalksnflajsdnflkjdnfklajdsnflk';

app.use(cors())
app.use(express.json());

mongoose.connect('mongodb+srv://isaquefranklin:b1l1ona1re@cluster0.hlzk7ku.mongodb.net/?retryWrites=true&w=majority')

app.post('/cadastro', async (req, res) => {
    const { username, password } = req.body;
    try{
        const userDoc = await User.create({
        username, 
        password:bcrypt.hashSync(password, salt),
    })
        res.json(userDoc);
    } catch(e) {
        console.log(e);
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username: username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        }) 
    } else {
        res.status(400).json('Usuário ou senha incorretos.')
    }
})

app.listen(4000, () => {
    console.log('Servidor online.')
})

//mongodb+srv://isaquefranklin:b1l1ona1re@cluster0.hlzk7ku.mongodb.net/?retryWrites=true&w=majority