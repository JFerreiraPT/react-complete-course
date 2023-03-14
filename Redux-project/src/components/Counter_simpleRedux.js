import {  useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector(state => state.counter);
  const showCounter = useSelector(state => state.showCounter);

  //this dispatch can call an action
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch({type: 'INCREMENT'})
  };

  const decrementHandler = () => {
    dispatch({type: 'DECREMENT'})
  };

  const increaseHandler = () => {
    dispatch({type: 'INCREASE', value: 5});
  }


  const toggleCounterHandler = () => {
    dispatch({type: "TOGGLE_COUNTER"});
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler} >Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
