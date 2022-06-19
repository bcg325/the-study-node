import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../../features/noteSlice";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { IoSyncCircleSharp } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Input from "../../../components/utilities/Input";

const NoteEditor = ({ note, isLoading, styles }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [oldEditorState, setOldEditorState] = useState();
  const [oldTitle, setOldTitle] = useState();
  const isFirstRender = useRef(true);

  useEffect(() => {
    setTitle(note.title || "");
    if (note.editorContent) {
      const content = convertFromRaw(JSON.parse(note.editorContent));
      const newState = EditorState.createWithContent(content);
      setEditorState(newState);
      setOldEditorState(newState);
      setOldTitle(note.title);
      setTitle(note.title);
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [note]);

  const onTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const onEditorChange = (newState) => {
    setEditorState(newState);
  };

  useEffect(() => {
    if (!oldTitle) {
      setOldTitle(title);
    }
    const timer = setTimeout(() => {
      if (oldTitle !== title) {
        const newTitle = title ? title : "Untitled";
        dispatch(updateNote({ id: note.id, noteData: { title: newTitle } }));
        setOldTitle(title);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [title, dispatch, note.id, oldTitle]);

  useEffect(() => {
    if (!oldEditorState) {
      setOldEditorState(editorState);
      return;
    }
    const timer = setTimeout(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      if (
        oldEditorState.getCurrentContent().getPlainText("\u0001") !==
          editorState.getCurrentContent().getPlainText("\u0001") ||
        !oldEditorState
          .getCurrentInlineStyle()
          .equals(editorState.getCurrentInlineStyle())
      ) {
        const noteData = {
          editorContent: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
          plainContent: editorState.getCurrentContent().getPlainText(),
        };
        dispatch(
          updateNote({
            id: note.id,
            noteData,
          })
        );
        setOldEditorState(editorState);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [editorState, oldEditorState, note.id, dispatch]);

  if (!note) {
    return;
  }

  return (
    <div className={styles}>
      <div className="flex justify-center items-center mb-3">
        <Input
          value={title}
          onChange={onTitleChange}
          className=" mb-0 bg-snLightGray min-h-full text-lg !text-white border-none mr-3"
        />
        {isLoading ? (
          <IoSyncCircleSharp className="text-gray-300" size={30} />
        ) : (
          <IoIosCheckmarkCircle className="text-gray-300" size={30} />
        )}
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorChange}
        toolbar={{
          options: [
            "inline",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "history",
          ],
          textAlign: {
            inDropdown: true,
          },
        }}
        toolbarClassName="!rounded-t-md flex justify-center !p-3 sticky top-10 z-30 !bg-snGray text-black mx-auto !border-0"
        editorClassName=" bg-snLightGray min-h-screen px-4 py-2 !rounded-b-md !shadow-lg"
      />
    </div>
  );
};
export default NoteEditor;
