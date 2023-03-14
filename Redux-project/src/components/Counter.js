//In this component we use redux toolkit
import {  useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../store/index';

import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector(state => state.counter.counter);
  const showCounter = useSelector(state => state.counter.showCounter);

  //this dispatch can call an action
  const dispatch = useDispatch();

  const incrementHandler = () => {

    dispatch(counterActions.increment())
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(5)); // {type: UNIQUE_GENERATED_BY_REDUX. payload:10}
  }


  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
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
