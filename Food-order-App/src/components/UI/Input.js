import classes from "./Input.module.css";

import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/*this spread operator means we pass everything to this input, like type and so on */}
      <input ref={ref} id={props.input.id} {...props.input} />
    </div>
  );
});

export default Input;
