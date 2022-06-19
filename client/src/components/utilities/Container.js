const Container = ({ children, className }) => {
  const styles = "mt-12 w-screen " + className;
  return <section className={styles}>{children}</section>;
};
export default Container;
