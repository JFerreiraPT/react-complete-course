import React, {useRef, useImperativeHandle, useEffect} from "react";

import classes from './Input.module.css'

//this returns a react component that can be bound to a ref
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    
    //it will run only once because of the empty array
    //when rendered jus put cursor on component
    // useEffect(() => {
    //     inputRef.current.focus();
    // }, [])

    //we can make different
    // we will call this function from exterior, this is not we should use normally
    const activate = () => {
        inputRef.current.focus();
    }
    
    //this will make activate function available outside as focus
    useImperativeHandle(ref, () => {
        return {focus: activate}
    })

    return (
        <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChangeHandler}
          onBlur={props.onBlur}
        />
      </div>

    )

});

export default Input;