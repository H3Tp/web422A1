/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Het patel Student ID: 154671218_ Date:19/01/23
* Cyclic Link: _______________________________________________________________
*
********************************************************************************/

const express = require('express');
const MoviesDB = require('./moviesDB');
const db = new MoviesDB();
const cors = require('cors');
require('dotenv').config();
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
});

app.post('/api/movies', (req, res) => {
    const body = req.body;
    db.addNewMovie(body)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
});

app.get('/api/movies', (req, res) => {
    const { page, perPage, title } = req.query;
    db.getAllMovies(page, perPage, title)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
});

app.get('/api/movies/:id', (req, res) => {
    const id = req.params.id;
    db.getMovieById(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
});

app.put('/api/movies/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    db.updateMovieById(body, id)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
});

app.delete('/api/movies/:id', (req, res) => {
    const id = req.params.id;
    db.deleteMovieById(id)
        .then((data) => {
            res.status(204).json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
});

db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});