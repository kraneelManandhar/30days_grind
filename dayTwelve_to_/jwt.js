const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
require('dotenv').config()
app.use(express.json());

const postMessage = [
    {username: "Kraneel",task: "Code JWT system" },
    {username: "Nikka",task: "Be The Sun God" },
    {username: "Kraneel",task: "Study Node.js" }
];

app.post('/login', (req, res) => {
    const username = req.body.name;
    if (!username) return res.status(400).json({ message: "Name required" });

    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.json({ accessToken: accessToken });
});

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}
app.get('/posts', authenticate, (req, res) => {
    const userPosts = postMessage.filter(post => post.username === req.user.name);
    res.json(userPosts);
});

app.listen(5000,()=>{
    console.log("Hosted at http://localhost:5000");
})