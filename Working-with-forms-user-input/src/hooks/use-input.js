import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [enteredInputTouched, setEnteredInputTouched] = useState(false);

  const inputIsValid = validateValue(enteredInput);
  const hasError = !inputIsValid && enteredInputTouched;

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setEnteredInputTouched(true);
  };

  const reset = () => {
    setEnteredInput("");
    setEnteredInputTouched(false);
  };

  return {
    value: enteredInput,
    isValid: inputIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
