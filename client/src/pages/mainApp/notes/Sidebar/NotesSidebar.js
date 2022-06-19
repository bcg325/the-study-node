import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Button from "../../../../components/utilities/Button";
import Input from "../../../../components/utilities/Input";
import NotesColumn from "./NotesColumn";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import selectFilteredNotes from "../../../../selectors/selectFilteredNotes";
import Sidebar from "../../../../components/utilities/Sidebar";

const NotesSidebar = ({ notes, collapse, toggleCollapse, handleNewNote }) => {
  const [filter, setFilter] = useLocalStorage("noteFilter", "lastChanged");
  const [search, setSearch] = useState("");

  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
  };

  const filteredNotes = selectFilteredNotes(notes, filter, search);

  const sidebarStyles =
    (collapse || "w-72 md:w-60 lg:w-80  ") +
    " text-white bg-snGray fixed h-full flex flex-col justify-start align-center items-center";

  return (
    <Sidebar
      className={sidebarStyles}
      toggleSidebar={toggleCollapse}
      collapse={collapse}
    >
      <div className="flex w-full justify-between">
        <Button
          onClick={handleNewNote}
          className="flex items-center justify-center gap-2 px-0 py-1 bg-snBlue mx-3.5 rounded-lg mt-3 w-full"
        >
          <AiOutlinePlus size={20} className="text-white" />
          <span>New Note</span>
        </Button>
      </div>

      <div className="w-full">
        <div className="mx-4 my-2">
          <form onSubmit={onSubmit} className="flex flex-col">
            <div className="relative">
              <IoSearch
                size={19}
                className="absolute left-2 top-4 text-white"
              />
              <Input
                value={search}
                onChange={onChangeSearch}
                placeholder=""
                className="mx-0 px-9 h-9 m-2 border-0 bg-snLightGray text-gray-50 placeholder-white w-full"
              />
              {search && (
                <IoMdClose
                  onClick={clearSearch}
                  className="absolute right-2 top-4 text-white cursor-pointer"
                  size={22}
                />
              )}
            </div>
            <div className="flex justify-between items-center ">
              <span className="">{filteredNotes.length} Notes</span>
              <select
                value={filter}
                onChange={onChangeFilter}
                className="self-end text-white rounded-lg px-1 pb-1 focus:outline-none bg-snGray cursor-pointer "
              >
                <option value="lastChanged">Last Changed</option>
                <option value="dateCreated">Date Created</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </form>
        </div>

        <NotesColumn
          toggleSidebar={toggleCollapse}
          filter={filter}
          notes={filteredNotes}
        />
      </div>
    </Sidebar>
  );
};
export default NotesSidebar;
