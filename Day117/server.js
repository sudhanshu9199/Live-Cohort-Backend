const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Home way.')
});

let notes = []

app.post('/notes', (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    res.json({
        message: "Note added successfully",
        notes: notes
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
    
})