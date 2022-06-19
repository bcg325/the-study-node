const ModalOverlay = ({ handleClose, className }) => {
  const styles = "z-40 fixed inset-0 " + className;
  return <div onClick={handleClose} className={styles}></div>;
};
export default ModalOverlay;
