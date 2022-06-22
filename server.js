const express = require('express');
const path = require('path');
const fs = require('fs');
const e = require('express');

const PORT = 3001;

const app = express();

app.use(express.static('public'));

// When the path is the base path (on startup or by clicking the header title),
app.get('/', (req, res) =>
    // The index.html page is returned as a response
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// When the path is /notes (using the 'Get Started' btn)
app.get('/notes', (req, res) =>
    // The notes.html page is returned as a response
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// getNotes()
app.get('/notes/api', (req, res) => {
    const dbData = fs.readFileSync('./db/db.json', 'utf8');
    const notes = dbData.length ? JSON.parse(dbData) : [];

    return res.json(notes);
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
