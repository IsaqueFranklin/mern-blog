const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs')
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'})
const fs = require('fs')

const salt = bcrypt.genSaltSync(10);
const secret = 'lkanlskfnalksnflajsdnflkjdnfklajdsnflk';

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

//mongoose.connect('mongodb+srv://isaquefranklin:b1l1ona1re@cluster0.hlzk7ku.mongodb.net/?retryWrites=true&w=majority')

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://isaquefranklin:b1l1ona1re@cluster0.hlzk7ku.mongodb.net/?retryWrites=true&w=majority').then((response) => {
    console.log('Conectado ao mongo.')
    //console.log('Resposta do servidor: '+response)
}).catch((err) => {
    console.log('Erro ao conectar com mongo.')
    console.log('Erro do servidor: '+err)
})

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

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
});

app.get('/perfil', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {title,summary,content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
      });
      res.json(postDoc);
    });
  
});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    res.json();
})

app.get('/post', async (req,res) => {
    res.json(
      await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.listen(4000, () => {
    console.log('Servidor online.')
})

//mongodb+srv://isaquefranklin:b1l1ona1re@cluster0.hlzk7ku.mongodb.net/?retryWrites=true&w=majority