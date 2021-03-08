// Dependencies
const http = require('http');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// const baseUrl = "https://swapi.dev/api/";
// const queryFilms = "films/";
// const movieIdFix = [0, 4, 5, 6, 1, 2, 3];

// Middleware
app.use(express.static('static'));

// Functions
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => {
    res.send('Home Route');
});

app.get('/films', (req, res) => {
    res.render('pages/index.ejs');
});

app.get('/films/:id', (req, res) => {
    res.render('pages/detail.ejs');
});

app.listen(3000, function () {
    console.log(`Server listening at http://localhost:${port}`);
});