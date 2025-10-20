const express = require('express');
const connectToDB = require('./src/db/db.js')
const noteModel = require('./src/models/note.model.js')
const app = express();
app.use(express.json());
connectToDB();

app.get('/', (req, res) => {
    res.send('You Entered the room 1')
});
app.post('/notes', async (req, res) => {
    const {title, content} = req.body;
    console.log(title, content);

    await noteModel.create({
        title, content
    })

    res.json({
        message: "Note created"
    })
})

app.get('/notes', async (req, res) => {
    const notes = await noteModel.find();
    res.json({
        message: "Notes fetch successfully!",
        notes
    })
});

app.delete('/notes/:id', async (req, res) => {
    const noteId = req.params.id;

    await noteModel.findOneAndDelete({
        _id : noteId
    })

    res.json({
        message: "note deleted!"
    })
})

app.patch('/notes/:id', async(req, res) => {
    const noteId = req.params.id;
    const { title } = req.body;

    await noteModel.findOneAndUpdate({
        _id: noteId
    }, {
        title: title
    })

    res.json({
        message: "note title updated!"
    })
})

app.listen(3000, () => {
    console.log('Server runned at port 3000');
})