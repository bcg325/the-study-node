import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote, resetCurrentNote } from "../../../../features/noteSlice";
import { BsThreeDots } from "react-icons/bs";
import NoteDropdown from "./NoteDropdown";
import { usePopper } from "react-popper";
import { useNavigate, useParams } from "react-router-dom";

const NoteRow = ({ id, title, plainContent, date, toggleSidebar }) => {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "absolute",
  });

  const handlePageChange = () => {
    navigate(id);
    toggleSidebar();
  };

  const handleDelete = (evt) => {
    evt.stopPropagation();
    setShowDropdown(false);
    dispatch(deleteNote(id));
    if (noteId && noteId === id) {
      dispatch(resetCurrentNote());
      navigate("/notes");
    }
  };

  const toggleDropdown = (evt) => {
    evt.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const rowStyles =
    (noteId === id
      ? "border-l-4 border-l-snBlue "
      : "cursor-pointer hover:bg-gray-800") +
    " z-1 flex flex-col border-y border-gray-500 px-3 py-2 w-full";
  return (
    <div onClick={handlePageChange} className={rowStyles}>
      <div className="flex justify-between relative w-full">
        <h3 className="font-medium truncate">{title}</h3>
        <div className="absolute">
          <NoteDropdown
            show={showDropdown}
            handleClose={toggleDropdown}
            handleDelete={handleDelete}
            ref={setPopperElement}
            styles={styles.popper}
            attributes={attributes.popper}
          />
        </div>
        <div
          ref={setReferenceElement}
          onClick={toggleDropdown}
          className="hover:bg-gray-700 rounded p-1"
        >
          <BsThreeDots size={22} />
        </div>
      </div>
      <p className="my-1.5 line-clamp-2">{plainContent}</p>
      <span className="font-light">
        {new Date(date).toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "2-digit",
          hour: "numeric",
          minute: "numeric",
        })}
      </span>
    </div>
  );
};
export default NoteRow;
