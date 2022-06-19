import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, reset } from "../../features/authSlice";
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
    watch,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    name: {
      required: "Name is required",
      maxLength: {
        value: 50,
        message: "Name must be fewer than 50 characters",
      },
      pattern: {
        value: /^[A-Za-z ]+$/i,
        message: "Name must only have alphabetic characters",
      },
    },
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
    passwordConfirm: {
      validate: (value) =>
        value === watchPassword || "The passwords do not match",
    },
  };

  const watchPassword = watch("password", false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/notes");
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess, user, navigate]);

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    dispatch(registerUser(userData));
  };

  if (isLoading) {
    return;
  }

  return (
    <div className="w-1/2 max-w-xs mx-auto">
      <GoogleAuth className="mt-4" text="Sign Up with Google" />

      <h2 className="text-xl flex justify-center items-center">
        <div className="w-1/2 border-b-2 border-gray-300"></div>
        <span className="bg-white p-4 text-gray-600">or</span>
        <div className="w-1/2 border-b-2 border-gray-300"></div>
      </h2>

      <Card>
        <h1 className="text-2xl text-center mb-3">Sign Up</h1>
        <FormAlert
          className="text-red-600"
          error={isError}
          message={message}
          icon={IoAlertCircle}
        />
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <FormAlert
            className="text-red-600"
            error={errors.name}
            icon={FiAlertTriangle}
          />
          <Input
            type="text"
            name="name"
            placeholder="Name"
            {...register("name", registerOptions.name)}
          />
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
          <FormAlert
            className="text-red-600"
            error={errors.passwordConfirm}
            icon={FiAlertTriangle}
          />
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            {...register("passwordConfirm", registerOptions.passwordConfirm)}
          />
          <div className="flex text-gray-700">
            <p>Have an account?</p>
            <Link to="/login" className="ml-1 block mb-3 self-start  underline">
              Log in
            </Link>
          </div>
          <Button className="w-1/2 text-mlg mt-3 mx-auto self-center">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
