import { useState } from "react"

const useInput2 = (validateField) => {
    const [enteredField, setEnteredField] = useState("");
    const [enteredFieldTouched, setEnteredFieldTouched] = useState(false);

    const isEnteredFieldValid = validateField(enteredField);
    const hasErrors = !isEnteredFieldValid && enteredFieldTouched;

    const onFieldChangeHandler = event => {
        setEnteredField(event.target.value);
    }

    const onFieldBlurHandler = event => {
        setEnteredFieldTouched(true);
    }

    const resetField = () => {
        setEnteredField("");
        setEnteredFieldTouched(false);
    }

    return {
        enteredField,
        isEnteredFieldValid,
        hasErrors,
        onFieldChangeHandler,
        onFieldBlurHandler,
        resetField
    }
    

}


export default useInput2;