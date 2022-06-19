const Card = (props) => {
  const styles =
    props.className +
    " mx-auto p-5 border-2 border-gray-300 rounded-xl shadow-lg";
  return (
    <div {...props} className={styles}>
      {props.children}
    </div>
  );
};

export default Card;
