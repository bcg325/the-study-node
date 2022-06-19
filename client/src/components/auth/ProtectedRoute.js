import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, reset } from "../../features/authSlice";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (!user && isSuccess) {
      navigate("/login");
    }
  }, [dispatch, user, isSuccess, navigate]);

  if (!user && isError) {
    return <Navigate to="/login" />;
  }

  if (isLoading || !user) {
    return;
  }

  return children;
};

export default ProtectedRoute;
