import { motion } from "framer-motion";

const Button = (props) => {
  const styles =
    props.className +
    " py-2 px-5 md:px-6 pt-1 text-white bg-black rounded-full baseline";
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={props.onClick}
      className={styles}
    >
      {props.children}
    </motion.button>
  );
};

export default Button;
