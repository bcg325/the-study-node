import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, reset } from "../../features/authSlice";
import { useForm } from "react-hook-form";
import Card from "../../components/utilities/Card";
import Input from "../../components/utilities/Input";
import Button from "../../components/utilities/Button";
import FormAlert from "../../components/utilities/FormAlert";
import { FiAlertTriangle } from "react-icons/fi";
import { IoAlertCircle } from "react-icons/io5";
import GoogleAuth from "../../components/auth/GoogleAuth";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/notes");
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess, user, navigate]);

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginUser(userData));
  };

  if (isLoading) {
    return;
  }

  return (
    <div className="w-1/2 max-w-xs mx-auto">
      <GoogleAuth className="mt-4" text="Login with Google"></GoogleAuth>
      <h2 className="text-xl flex justify-center items-center">
        <div className="w-1/2 border-b-2 border-gray-300"></div>
        <span className="bg-white p-4 text-gray-600">or</span>
        <div className="w-1/2 border-b-2 border-gray-300"></div>
      </h2>
      <Card>
        <h1 className="text-2xl text-center mb-3">Login</h1>
        <FormAlert
          className="text-red-600"
          error={isError}
          message={"Email or password is incorrect"}
          icon={IoAlertCircle}
        />
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <FormAlert
            className="text-red-600"
            error={errors.email}
            icon={FiAlertTriangle}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", registerOptions.email)}
          />
          <FormAlert
            className="text-red-600"
            error={errors.password}
            icon={FiAlertTriangle}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", registerOptions.password)}
          />
          <Link
            to="/register"
            className="text-gray-700 ml-1 block mb-3 self-start hover:underline"
          >
            Create an account
          </Link>
          <Button className="w-1/2 text-mlg mt-3 mx-auto self-center">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
