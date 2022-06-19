import NotesRow from "./NoteRow";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useScreenWidth from "../../../../hooks/useScreenWidth";

const NotesColumn = ({ filter, notes, toggleSidebar }) => {
  const screenWidth = useScreenWidth();

  if (notes.length === 0) return null;

  const altToggleSidebar = () => {
    if (screenWidth < 625) {
      toggleSidebar();
    }
  };
  return (
    <div className="w-full">
      <SimpleBar style={{ maxHeight: 400 }}>
        {notes.map((note) => (
          <NotesRow
            toggleSidebar={altToggleSidebar}
            key={note.id}
            id={note.id}
            title={note.title}
            plainContent={note.plainContent}
            date={filter === "dateCreated" ? note.createdAt : note.updatedAt}
          />
        ))}
      </SimpleBar>
    </div>
  );
};
export default NotesColumn;
