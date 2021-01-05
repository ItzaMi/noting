import MDEditor from '@uiw/react-md-editor';

const MarkdownPanel = ({
  viewMode,
  editorHeight,
  noteToBeViewed,
  note,
  setNote,
  darkMode,
}) => {
  return (
    <>
      {viewMode ? (
        <MDEditor.Markdown
          className="py-5 px-7 dark:text-gray-200 overflow-scroll"
          height={editorHeight}
          style={{ height: editorHeight, borderRadius: '0px' }}
          source={noteToBeViewed}
        />
      ) : (
        <MDEditor
          className={`py-2 px-5 dark:bg-background-grey ${
            darkMode && 'darkMode'
          }`}
          id="noteinput"
          value={note}
          onChange={setNote}
          preview="edit"
          hideToolbar
          visiableDragbar={false}
          height={editorHeight}
          style={{
            height: editorHeight,
            borderRadius: '0px',
          }}
        />
      )}
    </>
  );
};

export default MarkdownPanel;
