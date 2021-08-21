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
    res.json(allNotes.slice);
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


//creating new notes 
function createNewNote(body, notesArray) {
    const newnote = body;
    if (notesArray.length === 0)
    notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray)
    );

    return newNote;
}


//post new notes 
app.post('/api/notes', (req,res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote)
});


//delete notes 
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice();
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray)
            );

            break;

        }
    }
}

app.delete('/', (req,res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}!`);
});