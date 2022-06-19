import ReactDOM from "react-dom";
import ModalOverlay from "../../../../components/utilities/ModalOverlay";
import { forwardRef } from "react";

const NoteDropdown = forwardRef(
  ({ show, handleDelete, handleClose, styles, attributes }, ref) => {
    if (!show) {
      return;
    }

    const optionStyles =
      "hover:bg-gray-600 px-3 border border-gray-500 py-2 first:rounded-t-xl first:border-b last:rounded-b-xl";
    return ReactDOM.createPortal(
      <>
        <div
          ref={ref}
          style={styles}
          {...attributes}
          className="z-50 text-white flex flex-col bg-snLightGray rounded-xl w-32 absolute overflow-hidden cursor-pointer"
        >
          <span onClick={handleDelete} className={optionStyles}>
            Delete Note
          </span>
        </div>
        <ModalOverlay handleClose={handleClose} />
      </>,
      document.querySelector("#modal")
    );
  }
);
export default NoteDropdown;
