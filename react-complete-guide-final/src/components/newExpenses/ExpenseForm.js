import React, { useState } from "react";

import './ExpenseForm.css';

//function defined on parent is received here
const ExpenseForm = (props) => {
    //const [enteredTitle, setEnteredTitle] = useState('');
    //const [enteredAmount, setEnteredAmount] = useState('');
    //const [enteredDate, setEnteredDate] = useState('');

const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
});

    const titleChangeHandler = (event) => {
        //setEnteredTitle(event.target.value);

        //we use spread opertador, beacause we need to ensure other values are not lost
        // setUserInput({
        //     enteredTitle: event.target.value,
        //     ...userInput
        // })

        //better and safer approach
        //when change on state depends on previous
        setUserInput((prevState) => {
            return { ...prevState, enteredTitle: event.target.value};
        });

        
        
    };

    const amountChangeHandler = (event) => {
        //setEnteredAmount(event.target.value);

        // setUserInput({
        //     enteredAmount: event.target.value,
        //     ...userInput
        // })
        setUserInput((prevState) => {
            return { ...prevState, enteredAmount: event.target.value};
        });
        
    }

    const dateChangeHandler = (event) => {
        //setEnteredDate(event.target.value);

        // setUserInput({
        //     enteredDate: event.target.value,
        //     ...userInput
        // })
        setUserInput((prevState) => {
            return { ...prevState, enteredDate: event.target.value};
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        //console.log(userInput);

        //map user input
        const expenseData = {
            title: userInput.enteredTitle,
            amount: userInput.enteredAmount,
            date: new Date(userInput.enteredDate)
        }

        //clear input
        setUserInput({
            enteredTitle: '',
            enteredAmount: '',
            enteredDate: ''
        })

        //we are executing a function that is defined on parent component
        props.onSaveExpenseData(expenseData);

    }

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    {/* when defining value we are doing a 2 way biding */}
                    <input value={userInput.enteredTitle} onChange={titleChangeHandler} type='text' />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input value={userInput.enteredAmount} onChange={amountChangeHandler} type='number' min="0.01" step="00.1" />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input value={userInput.enteredDate} onChange={dateChangeHandler} type='date' min="2019-01-01" max="2023-12-31" />
                </div>
            </div>
            <div className="new-expense__actions">
                <button onClick={props.onCancelFormHandler}>Cancel</button>
                <button type="submit">Add expense</button>
            </div>
        </form>
    )
}

export default ExpenseForm;