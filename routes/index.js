const router = require('express').Router();
const path = require('path');
const { readFile, uuid, writeFile } = require('../utils');

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

// Reads db.json file and returns previous notes (getNotes function)
router.get('/api/notes', (req, res) => {
    const notes = readFile('./db/db.json');
    return res.json(notes);
});

// Adds new note to db.json file (saveNotes function)
router.post('/api/notes', (req, res) => {
    if (req.body) {
        const newNote = {
            ...req.body,
            id: uuid()
        };
        const notes = readFile('./db/db.json');
        notes.push(newNote);
        const noteString = JSON.stringify(notes, null, 2);
        writeFile('./db/db.json', noteString);

        res.status(201).send('Success');
    } else {
        res.status(500).json('Error in saving note');
    }
});

module.exports = router;