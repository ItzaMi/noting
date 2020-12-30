import { useState, useRef } from 'react';
import './App.css';
import MDEditor from '@uiw/react-md-editor';

const App = () => {
  const [data, setData] = useState([{ text: 'Test note' }]);
  const [note, setNote] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState('');
  const [error, setError] = useState(false);

  const noteInput = useRef(null);

  const addNote = () => {
    setData((data) => [...data, { text: note }]);
    setNote('');
  };

  const deleteNote = (noteToDelete) => {
    const arrayOfNotes = data.filter((note) => note.text !== noteToDelete.text);
    setData(arrayOfNotes);
  };

  const editNote = (noteToBeEdit) => {
    if (editMode) {
      setError(true);
      return;
    }
    setEditMode(true);
    noteToBeEdit.isBeingEdited = true;
    setNoteToEdit(noteToBeEdit.text);
  };

  const saveChanges = (oldNote, newNote) => {
    const noteToChange = data.filter((note) => note.text === oldNote.text);
    noteToChange[0].text = newNote;
    setEditMode(false);
    noteToChange[0].isBeingEdited = false;
  };

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  return (
    <div className="relative bg-gray-100 h-screen p-10">
      <div className="shadow-sm">
        <MDEditor
          className="py-2 px-5 w-10/12"
          id="noteinput"
          type="text"
          placeholder="Enter a new note"
          value={note}
          onChange={setNote}
          preview="edit"
          hideToolbar
        />
        <button
          className="py-2 px-5 bg-gray-200 w-2/12 hover:bg-gray-300"
          onClick={() => addNote()}
        >
          Add note
        </button>
      </div>
      <div className="m-10">
        {data.map((note) => (
          <div key={note.text} className="flex flex-col mb-10">
            <div className="w-full">
              {note.isBeingEdited === true ? (
                <MDEditor
                  ref={noteInput}
                  className="w-full py-2 px-5"
                  value={noteToEdit}
                  onChange={setNoteToEdit}
                  preview="edit"
                  hideToolbar
                />
              ) : (
                <MDEditor.Markdown className="w-full py-2 px-5 bg-white">
                  {note.text}
                </MDEditor.Markdown>
              )}
            </div>
            <div>
              <button
                className="text-xs font-light mr-2 text-red-400 hover:text-red-500"
                onClick={() => deleteNote(note)}
              >
                Delete Note
              </button>
              {note.isBeingEdited === true ? (
                <button
                  className="text-xs font-light mr-2 text-blue-400 hover:text-blue-500"
                  onClick={() => saveChanges(note, noteToEdit)}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="text-xs font-light mr-2 text-blue-400 hover:text-blue-500"
                  onClick={() => editNote(note)}
                >
                  Edit Note
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="absolute p-5 bg-red-200 bottom-10 right-10 align-middle text-red-600">
          <p className="text-sm">
            There's already a note being edited. Finish that one first!
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
