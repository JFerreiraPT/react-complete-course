import useInput2 from "../hooks/use-input2";

const BasicForm = (props) => {
  const validateName = (name) => name.trim().length > 5;
  const validateLastName = (lname) => lname.trim().length > 2;
  const validateEmail = (email) => email.trim().length > 3 && email.includes("@");


  const {
    enteredField: enteredName,
        isEnteredFieldValid: isEnteredNameValid,
        hasErrors: hasEnteredNameErrors,
        onFieldChangeHandler: onNameChangeHandler,
        onFieldBlurHandler: onNameBlurHandler,
        resetField: resetName,
  } = useInput2(validateName);


  const {
    enteredField: enteredLName,
        isEnteredFieldValid: isEnteredLNameValid,
        hasErrors: hasEnteredLNameErrors,
        onFieldChangeHandler: onLNameChangeHandler,
        onFieldBlurHandler: onLNameBlurHandler,
        resetField: resetLName,
  } = useInput2(validateLastName);

  const {
    enteredField: enteredEmail,
        isEnteredFieldValid: isEnteredEmailValid,
        hasErrors: hasEnteredEmailErrors,
        onFieldChangeHandler: onEmailChangeHandler,
        onFieldBlurHandler: onEmailBlurHandler,
        resetField: resetEmail,
  } = useInput2(validateEmail);


  let isFormValid = false;
  
  if(isEnteredNameValid && isEnteredLNameValid && isEnteredEmailValid) {
    isFormValid = true;
  }



  const onSubmitHandler = () => {
    if(!isFormValid) {
      return
    }

    resetName();
    resetLName();
    resetEmail();
  }

  const nameClasses = !hasEnteredNameErrors ? 'form-control' : 'form-control invalid';
  const lNameClasses = !hasEnteredLNameErrors ? 'form-control' : 'form-control invalid';
  const emailClasses = !hasEnteredEmailErrors ? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={onSubmitHandler}>
      <div className='control-group'>
        <div className={nameClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name'
          value={enteredName}
          onChange={onNameChangeHandler}
          onBlur={onNameBlurHandler}
          />
          {hasEnteredNameErrors && <p className="error-text">Please enter a valid name</p>}
        </div>
        <div className={lNameClasses}>
          <label htmlFor='lname'>Last Name</label>
          <input type='text' id='lname' 
          value={enteredLName}
          onChange={onLNameChangeHandler}
          onBlur={onLNameBlurHandler}
          />
          {hasEnteredLNameErrors && <p className="error-text">Please enter a valid last name</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input type='email' id='email' 
        value={enteredEmail}
        onChange={onEmailChangeHandler}
        onBlur={onEmailBlurHandler}
        />
        {hasEnteredEmailErrors && <p className="error-text">Please enter a valid email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
