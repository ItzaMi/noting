import { useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([{ text: 'Hello' }]);
  const [note, setNote] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState('');

  const passNoteToState = ({ target }) => {
    setNote(target.value);
  };

  const addNote = () => {
    setData((data) => [...data, { text: note }]);
    setNote('');
  };

  const addNoteWithEnter = (event) => {
    if (event.keyCode === 13) {
      addNote();
    }
  };

  const deleteNote = (noteToDelete) => {
    const arrayOfNotes = data.filter((note) => note.text !== noteToDelete.text);
    setData(arrayOfNotes);
  };

  const editNote = (noteToBeEdit) => {
    if (editMode) {
      alert("There's already a note being edited. Finish that one first");
      return;
    }
    setEditMode(true);
    noteToBeEdit.isBeingEdited = true;
    setNoteToEdit({ text: noteToBeEdit.text });
  };

  const passEditNoteToState = ({ target }) => {
    setNoteToEdit({ text: target.value });
  };

  const saveChanges = (oldNote, newNote) => {
    const noteToChange = data.filter((note) => note.text === oldNote.text);
    noteToChange[0].text = newNote.text;
    setEditMode(false);
    noteToChange[0].isBeingEdited = false;
  };

  const saveChangesWithEnter = (event, oldNote, newNote) => {
    if (event.keyCode === 13) {
      saveChanges(oldNote, newNote);
    }
  };

  return (
    <div>
      <input
        id="noteinput"
        style={{ width: '80%' }}
        type="text"
        placeholder="Enter a new note"
        value={note}
        onChange={passNoteToState}
        onKeyDown={(e) => addNoteWithEnter(e)}
      />
      <button onClick={() => addNote()}>Add note</button>
      {data.map((note) => (
        <div key={note.text}>
          {note.isBeingEdited === true ? (
            <input
              value={noteToEdit.text}
              onChange={passEditNoteToState}
              onKeyDown={(e) => saveChangesWithEnter(e, note, noteToEdit)}
            />
          ) : (
            <p>{note.text}</p>
          )}
          <button onClick={() => deleteNote(note)}>Delete Note</button>
          {note.isBeingEdited === true ? (
            <button onClick={() => saveChanges(note, noteToEdit)}>
              Save Changes
            </button>
          ) : (
            <button onClick={() => editNote(note)}>Edit Note</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
