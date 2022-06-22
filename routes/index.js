const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { uuid } = require('../utils');

// When the path is the base path (on startup or by clicking the header title),
router.get('/', (req, res) =>
    // The index.html page is returned as a response
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// When the path is /notes (using the 'Get Started' btn)
router.get('/notes', (req, res) =>
    // The notes.html page is returned as a response
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// getNotes()
router.get('/api/notes', (req, res) => {
    const dbData = fs.readFileSync('./db/db.json', 'utf8');
    const notes = dbData.length ? JSON.parse(dbData) : [];

    return res.json(notes);
});

// saveNotes()
router.post('/api/notes', (req, res) => {
    console.log(`${req.method} to save note`);

    if (req.body) {
        const newNote = {
            ...req.body,
            id: uuid()
        };
        const dbData = fs.readFileSync('./db/db.json', 'utf8');
        const notes = dbData.length ? JSON.parse(dbData) : [];

        notes.push(newNote);

        const noteString = JSON.stringify(notes, null, 2);

        fs.writeFile('./db/db.json', noteString, (err) =>
            err
                ? console.error(err)
                : console.log(`Note has been written to JSON file`)
        );

        const response = {
            status: 'success',
            body: newNote,
        };

        res.status(201).json(response);
    } else {
        res.status(500).json('Error in saving note');
    }
});

module.exports = router;