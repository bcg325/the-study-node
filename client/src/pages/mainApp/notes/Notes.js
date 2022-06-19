import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, createNote } from "../../../features/noteSlice";
import { useOutletContext, useNavigate } from "react-router-dom";
import NotesSidebar from "./Sidebar/NotesSidebar";
import { Outlet } from "react-router-dom";
import Container from "../../../components/utilities/Container";
import notesImg from "../../../assets/images/notes.svg";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../../components/utilities/Button";

const Notes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapse, toggleCollapse] = useOutletContext();
  const { notes, currentNote, isError } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  useEffect(() => {
    if (currentNote && currentNote.id) {
      navigate(currentNote.id);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      navigate("/notes");
    }
  }, [isError, navigate]);

  const onNewNote = async () => {
    const newNote = await dispatch(createNote());
    const newNoteId = newNote.payload.id;
    navigate(newNoteId);
  };

  const pageStyles =
    "flex justify-center w-full  " +
    (collapse ? "lg:w-[calc(100vw-1.5rem)]" : "lg:w-[calc(100vw-1.5rem)]");
  const contentStyles =
    (collapse
      ? "  md:max-w-[38rem] lg:min-w-[46rem] px-3 "
      : "   md:ml-60 lg:ml-80 md:w-[23rem] md2:w-[24rem] md3:w-[27rem] md4:w-[30rem] lg:min-w-[32rem] xl:min-w-[46rem] ") +
    " w-full sm:max-w-[29.5rem] py-3   ";

  return (
    <Container className={"text-white"}>
      <NotesSidebar
        notes={notes}
        collapse={collapse}
        toggleCollapse={toggleCollapse}
        handleNewNote={onNewNote}
      />
      <div className={pageStyles}>
        {!currentNote && (
          <div className={contentStyles}>
            <img
              className="w-[24rem] mx-auto "
              width="24rem"
              src={notesImg}
              alt="illustration of an empty notebook"
            />
            <div className="flex flex-col items-center mt-6 mx-auto w-5/6 text-center">
              <h1 className="text-2xl mb-4">
                Select a note from the sidebar or create a note
              </h1>
              <Button
                onClick={onNewNote}
                className="flex items-center justify-center gap-2 px-0 py-1 bg-snBlue mx-3.5 rounded-lg mt-3  w-[10rem] h-11"
              >
                <AiOutlinePlus size={20} className="text-white" />
                <span>New Note</span>
              </Button>
            </div>
          </div>
        )}
        <Outlet context={[contentStyles]} />
      </div>
    </Container>
  );
};

export default Notes;
