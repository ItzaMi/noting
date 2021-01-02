import MDEditor from '@uiw/react-md-editor';

const MarkdownPanel = ({
  viewMode,
  editorHeight,
  noteToBeViewed,
  note,
  setNote,
}) => {
  return (
    <>
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
    </>
  );
};

export default MarkdownPanel;
