const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

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

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
