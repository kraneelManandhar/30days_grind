const express = require('express');
const app = express();
const port = 5000;


app.get('/',(req,res) => {
    res.send("Hello, Express is working!")
});

app.post('/',(req,res) => {
    res.send("Hello, Express is working properly.")
});

app.use('/',(req,res) => {
    res.send("Listen to me.")
})
app.listen(port ,() => {
    console.log(`Server is running at http://localhost:${port}`);
});