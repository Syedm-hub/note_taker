//requiring modules
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();


//requiring ports
const PORT = process.env.PORT || 3001;


const allNotes = require('./db/db.json');

//middlewares 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req,res) => {
    res.json(a)
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/'));
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});