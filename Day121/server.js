const express = require('express');
const app = express();
app.use(express.json());

const connectToDB = require('./src/db/db.js');

connectToDB();

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.post('/notes', (req, res) => {
    const {title, content} = req.body;
    console.log("Note:",title, "\nContent:", content);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})