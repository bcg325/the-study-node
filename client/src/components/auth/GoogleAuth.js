import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const GoogleAuth = (props) => {
  const styles =
    props.className +
    " flex items-center mx-auto border-gray-300 border-2 shadow align-center justify-center space-x-3 py-2 cursor-pointer rounded-2xl ";

  const onClick = () => {
    window.open("https://studynode.up.railway.app/auth/google", "_self");
  };
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={styles}
    >
      <FcGoogle size={32} />
      <p className="text-lg text-gray-500 font-medium">{props.text}</p>
    </motion.div>
  );
};
export default GoogleAuth;
