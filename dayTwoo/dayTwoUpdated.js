const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
let info = {};

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello from Express with middleware!');
});

app.post('/', (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.send("No data provided.");
    } else {
        info = req.body;
        res.json(info);
    }
});

app.get('/show', (req, res) => {
    if (Object.keys(info).length === 0) {
        res.send("No data available.");
    } else {
        res.json(info);
    }
});

app.use('/show', (req, res) => {
    res.send("Use GET method, dummy.");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
