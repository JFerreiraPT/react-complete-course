import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={styles.button}
      type={props.btnType || "button"}
      onClick={props.onClickHandler}
    >
      {props.children}
    </button>
  );
};

export default Button;
