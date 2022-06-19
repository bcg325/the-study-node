import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoteData } from "../../../features/noteSlice";
import { useParams } from "react-router-dom";
import NoteEditor from "./NoteEditor";
import { useOutletContext } from "react-router-dom";

const NotePage = () => {
  const dispatch = useDispatch();

  const { currentNote, isLoading } = useSelector((state) => state.notes);
  const { noteId } = useParams();
  const [contentStyles] = useOutletContext();

  useEffect(() => {
    dispatch(getNoteData(noteId));
  }, [noteId, dispatch]);

  if (!currentNote) {
    return;
  }

  return (
    <NoteEditor
      note={currentNote}
      isLoading={isLoading}
      styles={contentStyles}
    />
  );
};
export default NotePage;
