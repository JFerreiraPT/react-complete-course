import { useRef } from "react";

import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const enteredNameRef = useRef();

  const validateName = (name) => name.trim() !== "";
  const validateEmail = email => email.includes("@");


  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput
  } = useInput(validateName);

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput
  } = useInput(validateEmail);


  let formIsValid = false;


  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();


    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    resetNameInput();
    resetEmailInput();

    //we can see that both will print the name
    //console.log(enteredName, enteredNameRef.current.value);

    //setEnteredName("");
    //setEnteredNameTouched(false);

    // setEnteredEmail("");


    //not ideal, do not manipulate DOM manually
    //enteredNameRef.current.value = '';

    //validate name only on submit
  };

  const nameInputClasses = `form-control ${
    nameInputHasError ? "invalid" : ""
  }`;

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={enteredNameRef}
          value={enteredName}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must be not empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          value={enteredEmail}
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
