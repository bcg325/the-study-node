import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const classes =
    "px-3.5 py-1.5 mb-4 text-black appearance-none border-2 border-gray-300 text-gray-600 shadow rounded-lg w-full focus:outline-none focus:border-black placeholder-gray-500 " +
    props.className;
  return <input {...props} ref={ref} className={classes} />;
});

export default Input;
