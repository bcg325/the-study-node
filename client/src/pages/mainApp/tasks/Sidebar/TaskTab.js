import { NavLink } from "react-router-dom";
const TaskTab = ({ borderColor, icon, route, children, onClick }) => {
  const styles = ({ isActive }) =>
    (isActive
      ? "border-l-2 bg-gray-800 pointer-events-none " + borderColor
      : "hover:bg-gray-700") +
    " cursor-pointer flex items-center px-3.5 py-2.5 w-full";
  return (
    <NavLink onClick={onClick} className={styles} to={route}>
      {icon}
      <span className="ml-1">{children}</span>
    </NavLink>
  );
};
export default TaskTab;
