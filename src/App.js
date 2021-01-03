import { useState, useEffect } from 'react';
import './App.css';

import Error from './components/toast/Error';
import Button from './components/buttons/Button';
import MarkdownPanel from './components/markdownPanel/MarkdownPanel';
import Note from './components/note/Note';
import BlockTextLoader from './components/loaders/BlockTextLoader';

const App = () => {
  const [data, setData] = useState(() => {
    const localStorageValue = window.localStorage.getItem('data');

    const defaultValue = [
      {
        text: 'Test note\n# Hello',
        noteIsInViewMode: false,
        noteIsInEditMode: false,
      },
    ];

    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(() => {
    if (loading) {
      return '';
    } else {
      return 'Start your new note here';
    }
  });
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState('');
  const [noteToBeViewed, setNoteToBeViewed] = useState('');
  const [error, setError] = useState(false);
  const [editorHeight, setEditorHeight] = useState(window.innerHeight);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    window.addEventListener('load', updateMDEditorHeight);
    window.addEventListener('resize', updateMDEditorHeight);
  });

  const viewNote = (noteSetToView) => {
    if (loading) {
      setLoading(false);
    }
    if (editMode) {
      setError(true);
      return;
    }
    const getNoteWithViewModeTrue = data.filter(
      (note) => note.noteIsInViewMode === true
    );
    if (getNoteWithViewModeTrue.length) {
      getNoteWithViewModeTrue[0].noteIsInViewMode = false;
    }
    setViewMode(true);
    noteSetToView.noteIsInViewMode = true;
    setNoteToBeViewed(noteSetToView.text);
  };

  useEffect(() => {
    if (data.length > 0) {
      const firstNoteAvailable = data[0];
      viewNote(firstNoteAvailable);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNote = () => {
    setData((data) => [...data, { text: note, noteIsInViewMode: false }]);
    setNote('Start your new note here');
  };

  const deleteNote = (noteToDelete) => {
    if (editMode) {
      setError(true);
      return;
    }
    const arrayOfNotes = data.filter((note) => note.text !== noteToDelete.text);
    setData(arrayOfNotes);
  };

  const saveChanges = (noteToEdit, newTextNote) => {
    const noteToChange = data.filter((note) => note.text === noteToEdit);
    noteToChange[0].text = newTextNote;
    setEditMode(false);
    noteToChange[0].isBeingEdited = false;
    setViewMode(true);
    noteToChange[0].noteIsInViewMode = true;
    viewMode(noteToChange[0]);
    localStorage.setItem('data', JSON.stringify(data));
  };

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const updateMDEditorHeight = () => {
    setEditorHeight(window.innerHeight);
  };

  const editNote = (noteToBeEdit) => {
    if (editMode) {
      setError(true);
      return;
    }
    setViewMode(false);
    noteToBeEdit.noteIsInViewMode = false;
    setNote(noteToBeEdit.text);
    setEditMode(true);
    noteToBeEdit.isBeingEdited = true;
    setNoteToEdit(noteToBeEdit.text);
  };

  const newNote = () => {
    setViewMode(false);
    const getNoteWithViewModeTrue = data.filter(
      (note) => note.noteIsInViewMode === true
    );
    if (getNoteWithViewModeTrue.length) {
      getNoteWithViewModeTrue[0].noteIsInViewMode = false;
    }
    setNote('Start your new note here');
  };

  return (
    <div className="relative bg-gray-100 h-screen flex flex-row">
      <div className="w-9/12">
        {loading ? (
          <BlockTextLoader />
        ) : (
          <MarkdownPanel
            viewMode={viewMode}
            editorHeight={editorHeight}
            noteToBeViewed={noteToBeViewed}
            note={note}
            setNote={setNote}
          />
        )}
      </div>
      <div className="w-3/12 bg-gray-200 h-screen overflow-scroll">
        {loading ? (
          <Button text="" type="loading" />
        ) : editMode ? (
          <Button
            text="Save changes"
            onClickAction={() => saveChanges(noteToEdit, note)}
            type="save"
          />
        ) : viewMode ? (
          <Button text="New note" onClickAction={() => newNote()} type="new" />
        ) : (
          <Button text="Add note" onClickAction={() => addNote()} type="add" />
        )}
        {data.map((note, id) => (
          <Note
            note={note}
            key={note.text + id}
            loading={loading}
            editNoteFunction={() => editNote(note)}
            viewNoteFunction={() => viewNote(note)}
            deleteNoteFunction={() => deleteNote(note)}
          />
        ))}
      </div>
      {error && <Error />}
    </div>
  );
};

export default App;
