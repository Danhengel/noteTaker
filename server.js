const express = require('express')
const path = require('path')
const noteData = require('./db/db.json')
const fs = require('fs')
const db = require('./db/db.json')

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.static('public'));

const { v4: uuidv4 } = require('uuid');

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });   
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body

    newNote.id = uuidv4()

    db.push(newNote)

    fs.writeFileSync('./db/db.json', JSON.stringify(db))

    res.json(db)
})

app.delete('/api/notes/:id', (req, res) => {
    const newDb = db.filter((note) =>
        note.id !== req.params.id)

    fs.writeFileSync('./db/db.json', JSON.stringify(newDb))

    readFile.json(newDb)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () =>
    console.log(`Example app listening at https://localhost:${PORT}`)
);