// Dependencies
const http = require('http');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fetch = require('node-fetch');

const swFilmsUrl = "https://swapi.dev/api/films";
const detailUrl = "https://swapi.dev/api/films/";
const movieIdFix = [0, 4, 5, 6, 1, 2, 3];

const { getDetailData } = require('./static/scripts/api.js');

// Middleware
app.use(express.static(`${__dirname}/static`));

// Functions
app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}/views`));

// Home Route
app.get('/', (req, res) => {
    fetch(swFilmsUrl)
        .then((response) => {
            const swApiResponse = response.json();
            return swApiResponse;
        })
        .then((swData) => {
            console.log(swData);
            res.render('pages/index.ejs', { data: swData.results });
        });
});

// Detail Route
app.get('/films/:id', (req, res) => {
    fetch(detailUrl + movieIdFix[req.params.id])
        .then((response) => {
            const swApiResponse = response.json();
            console.log(swApiResponse);
            return swApiResponse;
        })
        .then((swData) => {
            const characters = swData.characters;
            const planets = swData.planets;
            const starships = swData.starships;

            async function test() {
                let characterResponse = await getDetailData(characters);
                // let planetResponse = await getDetailData(planets);
                // let starshipResponse = await getDetailData(starships);
                return characterResponse;
            }
            return test();
        })
        .then((characterData) => {
            console.log(characterData);
            // res.render('pages/detail.ejs', { data: characterData });
        })
});

app.listen(port, function () {
    console.log(`Server listening at http://localhost:${port}`);
});