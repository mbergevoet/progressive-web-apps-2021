// Dependencies
require('dotenv').config()
const compression = require('compression')
const express = require('express')
const app = express()
const port = process.env.PORT
const path = require('path')
const fetch = require('node-fetch')

const swFilmsUrl = "https://swapi.dev/api/films"
const detailUrl = "https://swapi.dev/api/films/"

const { getDetailData } = require('./static/scripts/api.js')

app
    .use(express.static(`${__dirname}/static`))
    .use(compression())
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
    .get('/films/:id', (req, res) => {
        fetch(detailUrl + req.params.id)
            .then((response) => {
                const swApiResponse = response.json()
                return swApiResponse;
            })
            .then((swData) => {
                const characters = swData.characters
                const starships = swData.starships
                const planets = swData.planets

                Promise.all([
                    getDetailData(characters),
                    getDetailData(starships),
                    getDetailData(planets)
                ])
                    .then(([characterData, starshipData, planetData]) => {
                        res.render('pages/detail.ejs', { characters: characterData, starships: starshipData, planets: planetData })
                    })
            })
    })
    .get('/offline', (req, res) => {
        res.render('pages/offline.ejs')
    })
    .listen(port, function () {
        console.log(`Server listening at http://localhost:${port}`)
    })