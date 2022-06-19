import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/authSlice";
import { resetCurrentNote } from "../../features/noteSlice";
import { RiTimerFlashFill } from "react-icons/ri";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdStickyNote2 } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { useMatch } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import TimerSettings from "./timer/TimerSettings";
import { useState } from "react";

const MainNavbar = ({ collapse, toggleCollapse }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentNote } = useSelector((state) => state.notes);
  const { noteId } = useParams();

  const timerRoute = useMatch("/timer");
  const [showTimerSettings, setShowTimerSettings] = useState(false);

  const onLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const onNoteClick = () => {
    if (currentNote && noteId) {
      dispatch(resetCurrentNote());
    }
  };

  const linkStyles = ({ isActive }) =>
    (isActive ? "border-b-2 border-gray-200 pointer-events-none " : "") +
    " w-full flex items-center justify-center px-2 md:px-3 mx-2 cursor-pointer";

  const timerBar = " ";
  const navbarStyles =
    "text-white bg-snLightGray h-12 z-40 fixed top-0 left-0 w-screen flex justify-between px-4 md:px-10 lg:px-16 xl:px-28 " +
    timerBar;

  return (
    <nav className={navbarStyles}>
      {showTimerSettings && (
        <TimerSettings
          handleClose={() => setShowTimerSettings(!showTimerSettings)}
        />
      )}
      <div className="flex items-center cursor-pointer ">
        {timerRoute ? (
          <span
            onClick={() => setShowTimerSettings(!showTimerSettings)}
            className="rounded p-1 hover:bg-gray-700 flex items-center gap-2"
          >
            <IoSettingsSharp size={20} />
          </span>
        ) : (
          <span
            onClick={toggleCollapse}
            className="rounded p-1 hover:bg-gray-700"
          >
            {collapse ? (
              <AiOutlineMenu size={21} />
            ) : (
              <AiOutlineClose size={22} />
            )}
          </span>
        )}
      </div>
      <ul className="flex self-justify-end">
        <NavLink onClick={onNoteClick} className={linkStyles} to="/notes">
          <MdStickyNote2 size={20} />
          <span className="hidden lg:inline ml-2">Notes</span>
        </NavLink>
        <NavLink className={linkStyles} to="/tasks">
          <MdLibraryAddCheck size={20} />
          <span className="hidden lg:inline ml-2">Tasks</span>
        </NavLink>
        <NavLink className={linkStyles} to="/timer">
          <RiTimerFlashFill size={20} />
          <span className="hidden lg:inline ml-2">Timer</span>
        </NavLink>

        <li
          className={
            " w-full flex items-center justify-center px-2 md:px-3 mx-2 cursor-pointer"
          }
          onClick={onLogout}
        >
          <IoLogOut size={20} />
          <span className="hidden lg:inline ml-2">Logout</span>
        </li>
      </ul>
    </nav>
  );
};
export default MainNavbar;
