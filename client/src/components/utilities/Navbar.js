import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, reset } from "../../features/authSlice";
import snLogo from "../../assets/images/snLogoWhite.svg";
import { logoutUser } from "../../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getUser());

    return () => {
      dispatch(reset());
    };
  }, []);

  if (isLoading) {
    return;
  }
  return (
    <nav className="bg-snGray text-white py-3 px-5 md:px-11 lg:px-20 xl:px-40 flex items-center justify-between">
      <Link className="text-lg" to="/">
        <img className="w-[10rem]" src={snLogo} alt="Study Node Logo" />
      </Link>
      {user ? (
        <div className="space-x-5 ">
          <Link className="space-x-5 rounded py-1 px-2 bg-snViolet" to="/notes">
            Workspace
          </Link>
          <span
            className="space-x-5 rounded py-1 px-2 border cursor-pointer"
            onClick={onLogout}
          >
            Logout
          </span>
        </div>
      ) : (
        <Link className="space-x-5 rounded py-1 px-2 bg-snViolet" to="/login">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
