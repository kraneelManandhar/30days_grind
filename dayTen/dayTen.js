const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const secret = "supersecret";

app.post('/login',(req,res) => {
    const user = {
        id : 1,
        username : "Kraneel" 
    }

    const token = jwt.sign(user,secret,{ expiresIn: '1h'});
    res.json({token});

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token,secret,(err,decoded) => {
            if (err){
                return res.sendStatus(403);
            }
            req.user = decoded;
            next();
        });
  
}

app.get('/dashboard',verifyToken,(req,res) => {
    res.json({
        message : `Welcome,${req.user.username}`,
        userData:req.user
    })
})

})
app.listen(5000,() => {
    console.log("Server hosted at http://localhost:5000");
})