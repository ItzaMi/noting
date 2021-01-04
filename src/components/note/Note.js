import IconButton from '../buttons/IconButton';
import SingleLineTextLoader from '../loaders/SingleLineTextLoader';

const Note = ({
  note,
  loading,
  editNoteFunction,
  viewNoteFunction,
  deleteNoteFunction,
  editMode,
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
    <div className="w-full py-5 px-5 flex flex-row justify-between items-center border-b-1 border-gray-500">
      {loading ? (
        <SingleLineTextLoader />
      ) : (
        <>
          <p className="font-bold text-lg w-9/12 dark:text-white">
            {titleOfNote(note.text)}
          </p>
          <div className="w-3/12 flex flex-row justify-end items-center">
            {note.noteIsInEditMode ? (
              <p className="text-gray-400 dark:text-white text-opacity-80 text-sm">
                Editing
              </p>
            ) : editMode === true ? null : (
              <>
                {note.noteIsInViewMode ? (
                  <IconButton
                    onClickAction={editNoteFunction}
                    typeOfIcon="edit"
                  />
                ) : (
                  <IconButton
                    onClickAction={viewNoteFunction}
                    typeOfIcon="view"
                  />
                )}
                <IconButton
                  onClickAction={deleteNoteFunction}
                  typeOfIcon="delete"
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
