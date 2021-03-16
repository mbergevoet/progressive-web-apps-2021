// Dependencies
const http = require('http')
const express = require('express')
const app = express()
const port = process.env.PORT
const path = require('path')
const fetch = require('node-fetch')

const swFilmsUrl = "https://swapi.dev/api/films"
const detailUrl = "https://swapi.dev/api/films/"
const movieIdFix = [0, 4, 5, 6, 1, 2, 3]

const { getDetailData } = require('./static/scripts/api.js')

app
    .use(express.static(`${__dirname}/static`))
    .set('view engine', 'ejs')
    .set('views', path.join(`${__dirname}/views`))
    .get('/', (req, res) => {
        fetch(swFilmsUrl)
            .then((response) => {
                const swApiResponse = response.json()
                return swApiResponse
            })
            .then((swData) => {
                res.render('pages/index.ejs', { films: swData.results })
            })
    })
    // Detail Route
    .get('/films/:id', (req, res) => {
        fetch(detailUrl + movieIdFix[req.params.id])
            .then((response) => {
                const swApiResponse = response.json();
                return swApiResponse;
            })
            .then((swData) => {
                const characters = swData.characters
                const planets = swData.planets
                const starships = swData.starships

                async function test() {
                    // Promise.all(characters, planets, starships)
                    let characterResponse = await getDetailData(characters)
                    // let planetResponse = await getDetailData(planets)
                    // let starshipResponse = await getDetailData(starships)
                    return characterResponse;
                }
                return test()
            })
            .then((characterData) => {
                // console.log(characterData)
                res.render('pages/detail.ejs', { characters: characterData })
            })
    });

app.listen(port, function () {
    console.log(`Server listening at http://localhost:${port}`)
});