import { useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([{ text: 'Hello' }]);
  const [note, setNote] = useState('');

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
        <p key={note.text}>{note.text}</p>
      ))}
    </div>
  );
};

export default App;
