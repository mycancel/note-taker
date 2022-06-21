const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

// When the path is the base path,
app.get('/', (req, res) =>
    // the user is redirected to the index.html page
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
