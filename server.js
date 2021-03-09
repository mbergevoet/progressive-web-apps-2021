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
    // console.log(detailUrl + movieIdFix[req.params.id]);
    fetch(detailUrl + movieIdFix[req.params.id])
        .then((response) => {
            const swApiResponse = response.json();
            return swApiResponse;
        })
        .then((swData) => {
            const detailEndpoints = [swData.characters, swData.planets, swData.starships];
            getDetailData(detailEndpoints);
        })
        .then((allEndpoints) => {
            console.log(allEndpoints);
            // res.render('pages/detail.ejs', { data: allEndpoints });
        })
});

// Helper functions
function getDetailData(allEndpoints) {
    const resultArray = allEndpoints.map(singleEndpoint => {
        return singleEndpoint.forEach(endpoint => {
            fetch(endpoint)
                .then(response => {
                    let responseData = response.json()
                    responseData.then(result => {
                        if (result.height) {
                            displayCharacters(result);
                        } else if (result.model) {
                            displayStarships(result);
                        } else {
                            displayPlanets(result);
                        }
                    });
                });
        });
    });
    console.log(resultArray);
    return resultArray;
};

app.listen(port, function () {
    console.log(`Server listening at http://localhost:${port}`);
});