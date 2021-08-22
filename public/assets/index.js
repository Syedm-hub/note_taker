let noteTitle;
let saveNoteBtn;
let noteText;
let NewNoteBtn;

if (window.location.pathname === '/notes') {
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-text');
    saveNoteBtn = document.querySelector('.save-note');
    NewNoteBtn = document.querySelector('.new-note');
}


//showing elements
const show = (element) => {
    element.style.display = 'inline';
};

//Hiding element 
const hide = (element) => {
    element.style.display = 'none';
};


//setting up active note 
let activeNote = {};

//getting the notes from API 
const getNotes = () =>
fetch('/api/notes', {
    method: 'GET',
    headers : {
        'Conent-Type' : 'appication/json',
    },
});


//save notes 
const saeNote = (note) => 
fetch ('/api/notes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
});


//delete a note 
const deleteNote = (id) =>
fetch('/api/notes/${id}', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
});


const renderActiveNote = () => {
    hide(saveNoteBtn);


if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
} 
else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = "";
    noteText.value = "";
}

};

//saving the notes 
const handleNoteSave = () => {
    const newNote = {
        title: noteTitle.value,
        text: noteText.value,
    };
    saveNoteBtn(newNote).then (() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

//Deleting the note 
const handleNoteDelete = (e) => {
    e.stopPropagation();

    const note = e.target;
    
    if (activeNote.id === noteId) {
        activeNote = {};
    }

    deleteNote(noteId).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

//displaying the active notes 
const handleNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
};


//Let the user to submit a new note 
const handleNewNoteView = (e) => {
    activeNote = {};
    renderActiveNote();
};

const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() 
    || !noteText.value.trim()) {
        hide(saveNoteBtn);
    } else {
        show(saveNoteBtn);
    }
};


