import { useState, useEffect } from 'react';
import './App.css';
import MDEditor from '@uiw/react-md-editor';

const App = () => {
  const [data, setData] = useState([{ text: 'Test note' }]);
  const [note, setNote] = useState('Start your new note here');
  const [editMode, setEditMode] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState('');
  const [error, setError] = useState(false);
  const [editorHeight, setEditorHeight] = useState(window.innerHeight);

  const addNote = () => {
    setData((data) => [...data, { text: note }]);
    setNote('Start your new note here');
  };

  const deleteNote = (noteToDelete) => {
    const arrayOfNotes = data.filter((note) => note.text !== noteToDelete.text);
    setData(arrayOfNotes);
  };

  const saveChanges = (noteToEdit, newTextNote) => {
    const noteToChange = data.filter((note) => note.text === noteToEdit);
    noteToChange[0].text = newTextNote;
    setEditMode(false);
    noteToChange[0].isBeingEdited = false;
    setNote('Start your new note here');
  };

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const updateMDEditorHeight = () => {
    setEditorHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('load', updateMDEditorHeight);
    window.addEventListener('resize', updateMDEditorHeight);
  });

  const viewNote = (noteToBeEdit) => {
    if (editMode) {
      setError(true);
      return;
    }
    setNote(noteToBeEdit.text);
    setEditMode(true);
    noteToBeEdit.isBeingEdited = true;
    setNoteToEdit(noteToBeEdit.text);
  };

  return (
    <div className="relative bg-gray-100 h-screen flex flex-row">
      <div className="w-9/12">
        <MDEditor
          className="py-2 px-5"
          id="noteinput"
          type="text"
          placeholder="Enter a new note"
          value={note}
          onChange={setNote}
          preview="edit"
          hideToolbar
          visiableDragbar={false}
          height={editorHeight}
          style={{ height: editorHeight, borderRadius: '0px' }}
        />
      </div>
      <div className="w-3/12 bg-gray-200 h-screen overflow-scroll">
        {editMode ? (
          <button
            className="py-2 px-5 w-full bg-gray-700 text-white hover:bg-gray-900"
            onClick={() => saveChanges(noteToEdit, note)}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="py-2 px-5 w-full bg-blue-700 text-white hover:bg-blue-900"
            onClick={() => addNote()}
          >
            Add note
          </button>
        )}
        {data.map((note) => (
          <div key={note.text} className="flex flex-col mb-10">
            <div className="w-full">
              <MDEditor.Markdown className="w-full py-2 px-5 bg-white">
                {note.text}
              </MDEditor.Markdown>
            </div>
            <div>
              <button
                className="text-xs font-light mr-2 text-red-400 hover:text-red-500"
                onClick={() => deleteNote(note)}
              >
                Delete Note
              </button>
              <button
                className="text-xs font-light mr-2 text-blue-400 hover:text-blue-500"
                onClick={() => viewNote(note)}
              >
                View Note
              </button>
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
