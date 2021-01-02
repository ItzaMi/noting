import { useState, useEffect } from 'react';
import './App.css';
import MDEditor from '@uiw/react-md-editor';

import Delete from './components/icons/Delete';
import Edit from './components/icons/Edit';
import View from './components/icons/View';

import styles from './components/icons/icons.module.css';

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

  const [note, setNote] = useState('Start your new note here');
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState('');
  const [noteToBeViewed, setNoteToBeViewed] = useState('');
  const [error, setError] = useState(false);
  const [editorHeight, setEditorHeight] = useState(window.innerHeight);

  const addNote = () => {
    setData((data) => [...data, { text: note, noteIsInViewMode: false }]);
    setNote('Start your new note here');
  };

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    window.addEventListener('load', updateMDEditorHeight);
    window.addEventListener('resize', updateMDEditorHeight);
  });

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

  const viewNote = (noteSetToView) => {
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

  const titleOfNote = (noteText) => {
    let firstPhraseWithoutSpecialCharacters = noteText
      .split('\n')[0]
      .replace(/[^\w\s]/gi, '');

    if (firstPhraseWithoutSpecialCharacters.length > 20) {
      firstPhraseWithoutSpecialCharacters = firstPhraseWithoutSpecialCharacters.substring(
        0,
        20
      );
      // firstPhraseWithoutSpecialCharacters.substring(0, 70 - 3) + '...';
    }
    return firstPhraseWithoutSpecialCharacters;
  };

  return (
    <div className="relative bg-gray-100 h-screen flex flex-row">
      <div className="w-9/12">
        {viewMode ? (
          <MDEditor.Markdown
            className="py-5 px-7"
            height={editorHeight}
            style={{ height: editorHeight, borderRadius: '0px' }}
            source={noteToBeViewed}
          />
        ) : (
          <MDEditor
            className="py-2 px-5"
            id="noteinput"
            value={note}
            onChange={setNote}
            preview="edit"
            hideToolbar
            visiableDragbar={false}
            height={editorHeight}
            style={{ height: editorHeight, borderRadius: '0px' }}
          />
        )}
      </div>
      <div className="w-3/12 bg-gray-200 h-screen overflow-scroll">
        {editMode ? (
          <button
            className="py-2 px-5 w-full bg-gray-700 text-white hover:bg-gray-900 transition-colors duration-200 ease-in-out"
            onClick={() => saveChanges(noteToEdit, note)}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="py-2 px-5 w-full bg-blue-700 text-white hover:bg-blue-900 transition-colors duration-200 ease-in-out"
            onClick={() => addNote()}
          >
            Add note
          </button>
        )}
        {data.map((note, id) => (
          <div
            key={note.text + id}
            className="w-full py-5 px-5 bg-white flex flex-row justify-between items-center border-b-2"
          >
            <p className="font-bold text-lg w-9/12">{titleOfNote(note.text)}</p>
            <div className="w-3/12 flex flex-row justify-end items-center">
              {note.isBeingEdited ? (
                <p className="text-gray-400 text-opacity-80 text-sm">Editing</p>
              ) : (
                <>
                  {note.noteIsInViewMode ? (
                    <button
                      className="mr-2 h-20px"
                      onClick={() => editNote(note)}
                    >
                      <Edit className={styles.editIcon} />
                    </button>
                  ) : (
                    <button
                      className="mr-2 h-20px"
                      onClick={() => viewNote(note)}
                    >
                      <View className={styles.viewIcon} />
                    </button>
                  )}
                  <button className="h-20px" onClick={() => deleteNote(note)}>
                    <Delete className={styles.deleteIcon} />
                  </button>
                </>
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
