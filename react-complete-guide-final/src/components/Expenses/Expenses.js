import React, { useState } from "react";
import "./Expenses.css";
import ExpensesFilter from "./ExepnsesFilter";
import ExpensesList from "./Expenseslist";
import ExpensesChart from "./ExpensesChart";

const Expenses = ({ expenses }) => {
  const [selectedYear, setSelectedYear] = useState("2020");

  const changeYearHandler = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense) => (
     expense.date.getFullYear().toString() === selectedYear
  ));



  return (
    <div className="expenses">
      <ExpensesFilter
        selected={selectedYear}
        onChangeYearHandler={changeYearHandler}
      />
      <ExpensesChart expenses={filteredExpenses}/>
      <ExpensesList filteredExpenses={filteredExpenses}/>
    </div>
  );
};

export default Expenses;
