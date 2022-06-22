const express = require('express');
const baseRoute = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(baseRoute);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
