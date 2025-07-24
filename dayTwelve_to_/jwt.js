const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
require('dotenv').config()
app.use(express.json());

app.get('/posts',authenticate,(req,res) => {
    // const user = {
    //     "name" : "Nikka",
    //     "task" : "Be The Sun God"
    // }
    // res.json(user)

    res.json(postMessage.filter(post => post.username === req.user.name))
})

app.get('/login',(req,res) =>{

    const username = req.body.name;
    const user = { name : username}
    

    const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken : accessToken})
})

function authenticate(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token ==null){
        return res.sendStatus(401)
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET , (err,user) => {
        if (err) return res.sendStatus(403)
        req.user = user;
        next();
    })
}

app.listen(5000,()=>{
    console.log("Hosted at http://localhost:5000");
})