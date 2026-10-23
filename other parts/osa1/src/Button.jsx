const Button = (props) => {
  return <button onClick={() => props.onHandle()}>{props.children}</button>;
};

export default Button;
