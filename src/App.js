import React, { useState, useEffect } from 'react';
import './App.css';

import Error from './components/toast/Error';
import Button from './components/buttons/Button';
import MarkdownPanel from './components/markdownPanel/MarkdownPanel';
import Note from './components/note/Note';
import BlockTextLoader from './components/loaders/BlockTextLoader';
import IconButton from './components/buttons/IconButton';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [data, setData] = useState(() => {
    const localStorageValue = window.localStorage.getItem('data');

    const defaultValue = [
      {
        text:
          "# Hi 👋 and welcome to **Noting**\n\n**Noting** is an easy-to-use app for you to take notes on your browser without absolutely no hassle! It keeps your info on *local storage* and uses Markdown so you can create your notes with your personal flare to them.\n\nIf this is your first time using Markdown, check out [this guide](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). It will teach you everything you need to know about it!\n\n ## About **Noting**\n\n**Noting** appeared as a ReactJS side project that slowly took shape into a full-fledged working app and here it is. While it's not complex, I believe it offers and delivers everything you may want on a straightforward note taking app.\n\n**Noting** allows you to create, edit and delete apps and offers you a **Dark Mode** so you can keep working on late hours! (_isn't that great?_ 😃)\n\n**Noting** keeps your info on *local storage* so be aware that any information losses will only be your fault! (Keeping a database secure would be too much work at the moment but I may think about implementing it!)\n\n## Contacts\n\nIf you encounter any issues using **Noting**, please [create an issue](https://github.com/ItzaMi/noting/issues) or contact me on [Twitter](https://twitter.com/HeyItzaMi) so I can fix it in no time!\n\nIf you find **Noting** helpful, consider [sponsoring this project](https://github.com/ItzaMi/noting) or [buying me a ko.fi](https://ko-fi.com/itzami) to show your support!\n\n## About the creator\n\nHey 👋  I'm Rui and I'm a self-taught front-end developer! I enjoy creating stuff and leaving my mark on the web and that's pretty much what drove me to follow this career path! If you want to know more about me, check out my [Twitter](https://twitter.com/HeyItzaMi), [Youtube](https://www.youtube.com/channel/UCwnDdBqfYvxIzDXXtyQ75fg), [GitHub](https://github.com/ItzaMi) or my [website](https://itzami.com/).",
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
    if (noteSetToView.noteIsInEditMode) {
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
    setData((data) => [...data, { text: note, noteIsInViewMode: true }]);
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
    noteToChange[0].noteIsInEditMode = false;
    setEditMode(false);
    setViewMode(true);
    noteToChange[0].noteIsInViewMode = true;
    viewNote(noteToChange[0]);
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
    noteToBeEdit.noteIsInEditMode = true;
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
    <div className={`${darkMode && 'dark'}`}>
      <div className="relative bg-gray-100 dark:bg-background-grey h-screen flex flex-row">
        <div className="w-9/12 ">
          {loading ? (
            <BlockTextLoader />
          ) : (
            <MarkdownPanel
              viewMode={viewMode}
              editorHeight={editorHeight}
              noteToBeViewed={noteToBeViewed}
              note={note}
              setNote={setNote}
              darkMode={darkMode}
            />
          )}
        </div>
        <div className="w-3/12 bg-gray-200 dark:bg-sidebar-grey h-screen overflow-scroll">
          <div className="flex flex-row">
            {loading ? (
              <Button text="" type="loading" />
            ) : editMode ? (
              <Button
                text="Save changes"
                onClickAction={() => saveChanges(noteToEdit, note)}
                type="save"
              />
            ) : viewMode ? (
              <Button
                text="New note"
                onClickAction={() => newNote()}
                type="new"
              />
            ) : (
              <Button
                text="Add note"
                onClickAction={() => addNote()}
                type="add"
              />
            )}
            <IconButton
              onClickAction={() => setDarkMode(!darkMode)}
              typeOfIcon="dark"
              darkMode={darkMode}
            />
          </div>
          {data.map((note, id) => (
            <Note
              note={note}
              key={note.text + id}
              loading={loading}
              editNoteFunction={() => editNote(note)}
              viewNoteFunction={() => viewNote(note)}
              deleteNoteFunction={() => deleteNote(note)}
              editMode={editMode}
            />
          ))}
        </div>
        {error && <Error />}
      </div>
    </div>
  );
};

export default App;
