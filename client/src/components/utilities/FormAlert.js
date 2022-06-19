const FormAlert = (props) => {
  const styles = "flex items-center space-x-2 mb-2 " + props.className;

  if (!props.error) {
    return;
  }

  return (
    <div className={styles}>
      <div>
        <props.icon />
      </div>
      <p>{props.message || props.error.message}</p>
    </div>
  );
};
export default FormAlert;
