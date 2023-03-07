import { React, useState } from 'react';
import './ExpenseItem.css';
import CalendarItem from './CalendarItem';
import Card from '../UI/Card';


const ExpenseItem = (prop) => {
  const expense = prop.expense;

  //if we want to change value we need to use state, we need to specify the variable and the handler
  // using state means we are seting state for that variable
  //state are separated for each component
  const [title, /*setTitle*/] = useState(expense.title);

  //the components is updated when the state is updated

  // const clickHandler = () => {
  //   setTitle('Updated');
  // };

  //we can only have a root elemnt by component, everything should be inside one, and only one div for example
  return (
    <li>
    <Card className="expense-item">
      <CalendarItem date={expense.date}></CalendarItem>
      <div className='expense-item__description'>
        <h2>{title}</h2>
        <div className='expense-item__price'>€{expense.amount}</div>
      </div>
      {/* <button onClick={ clickHandler }>Change Title</button> */}
    </Card>
    </li>
  );
}

export default ExpenseItem;
