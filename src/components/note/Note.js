import IconButton from '../buttons/IconButton';

const Note = ({
  note,
  editNoteFunction,
  viewNoteFunction,
  deleteNoteFunction,
}) => {
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
    <div className="w-full py-5 px-5 bg-white flex flex-row justify-between items-center border-b-2">
      <p className="font-bold text-lg w-9/12">{titleOfNote(note.text)}</p>
      <div className="w-3/12 flex flex-row justify-end items-center">
        {note.isBeingEdited ? (
          <p className="text-gray-400 text-opacity-80 text-sm">Editing</p>
        ) : (
          <>
            {note.noteIsInViewMode ? (
              <IconButton onClickAction={editNoteFunction} typeOfIcon="edit" />
            ) : (
              <IconButton onClickAction={viewNoteFunction} typeOfIcon="view" />
            )}
            <IconButton
              onClickAction={deleteNoteFunction}
              typeOfIcon="delete"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Note;
