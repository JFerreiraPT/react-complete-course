import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
    const [enteredUsername, setUsername] = useState('');
    const [enteredAge, setAge] = useState('');
    const [error, setError] = useState();

    const ValidateInputs = () => {
        let isValid = true;

        if(enteredUsername.trim().length === 0) isValid = false;
        if(+enteredAge <= 0) isValid = false;

        return isValid;
    }

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    }

    const ageChangeHandler = (event) => {
        setAge(event.target.value)
    }

    const onClickHandler = () => {
     setError();
    }

  const submitHandler = (event) => {
    event.preventDefault();

    if(!ValidateInputs()) {
        setError({
          title: 'Invalid Input!!',
          message: 'Please enter a valid name and age'
        })

        return
    }

    props.addNewUser({
        name: enteredUsername,
        age: enteredAge
    });

    setUsername('');
    setAge('');
  };

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onClickHandler={onClickHandler} />} 
    <Card className={styles.input}>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input onChange={usernameChangeHandler} value={enteredUsername} id="username" type="text"></input>
        <label htmlFor="age">Age</label>
        <input onChange={ageChangeHandler} value={enteredAge} id="age" type="number"></input>
        <Button btnType={"submit"}>Add User</Button>
      </form>
    </Card>
    </div>
  );
};

export default AddUser;
