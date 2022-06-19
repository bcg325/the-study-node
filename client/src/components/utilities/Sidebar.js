import ModalOverlay from "./ModalOverlay";

const Sidebar = ({ children, className, toggleSidebar, collapse }) => {
  const styles =
    "z-40 ease-in-out duration-200  " +
    (collapse ? "-translate-x-full " : "translate-x-0 ") +
    className;
  return (
    <>
      <aside className={styles}>{children}</aside>
      {collapse || (
        <ModalOverlay
          handleClose={toggleSidebar}
          className=" md:hidden bg-black bg-opacity-40 z-[35]"
        />
      )}
    </>
  );
};
export default Sidebar;
