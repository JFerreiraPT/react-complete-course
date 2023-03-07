import { React, useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (prop) => {

    const [showForm, changeShowForm] = useState(false);

    const onSaveExpenseData = (newExpense) => {
        const expenseData = {
            ...newExpense,
            id: Math.random().toString()
        }

        prop.onNewExpense(expenseData);
    };

    const startEditingHandler = () => {
        changeShowForm(true);
    }

    const cancelFormHandler = () => {
        changeShowForm(false);
    }

    //we want to return a form for user input
    return (
        <div className='new-expense'>
            {!showForm && <button onClick={startEditingHandler} >Add New Expense</button> }           
            {showForm && <ExpenseForm onCancelFormHandler={cancelFormHandler} onSaveExpenseData={onSaveExpenseData}/>}
        </div>
    )

};

export default NewExpense;