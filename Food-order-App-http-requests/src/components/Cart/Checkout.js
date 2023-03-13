import { useRef, useState } from "react";
import classes from "./Checkout.module.css"

const isEmpty = (value) => value.trim() === '';
const hasLength = (value, requiredLength) => {
    return value.trim().length >= requiredLength;
}

const Checkout = props => {
    const [formInputsValidity, setInputsValidity] = useState( {
        name: true,
        street: true,
        postalCode: true,
        city: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = event => {
        event.preventDefault();

        const enteredNameIsValid = !isEmpty(nameInputRef.current.value);
        const enteredStreetIsValid = !isEmpty(streetInputRef.current.value);
        const enteredPostalCodeIsValid = hasLength(postalCodeInputRef.current.value, 5);
        const enteredCityIsValid = !isEmpty(cityInputRef.current.value);
        
        setInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        })

        if(!enteredNameIsValid || !enteredStreetIsValid || !enteredPostalCodeIsValid || !enteredCityIsValid) {
            return;
        }

        props.onSubmitOrder({
            name: nameInputRef.current.value,
            street: streetInputRef.current.value,
            postalCode: postalCodeInputRef.current.value,
            city: cityInputRef.current.value,
        })

        nameInputRef.current.value = "";
        streetInputRef.current.value = "";
        postalCodeInputRef.current.value = "";
        cityInputRef.current.value = "";

    }

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={`${classes.control} ${!formInputsValidity.name ? classes.invalid : ''}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            {!formInputsValidity.name && <p>Please enter a valid name</p>}
          </div>
          <div className={`${classes.control} ${!formInputsValidity.street ? classes.invalid : ''}`}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef} />
            {!formInputsValidity.street && <p>Please enter a valid street</p>}
          </div>
          <div className={`${classes.control} ${!formInputsValidity.postalCode ? classes.invalid : ''}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalCodeInputRef} />
            {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}
          </div>
          <div className={`${classes.control} ${!formInputsValidity.city ? classes.invalid : ''}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef} />
            {!formInputsValidity.city && <p>Please enter a valid city</p>}
          </div>
          <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
              Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
          </div>
        </form>
      );
}

export default Checkout;