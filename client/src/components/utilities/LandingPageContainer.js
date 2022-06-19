const LandingPageContainer = ({ children, className }) => {
  const styles = "mx-8 md:mx-10 xl:mx-40 " + className;
  return <div className={styles}>{children}</div>;
};
export default LandingPageContainer;
