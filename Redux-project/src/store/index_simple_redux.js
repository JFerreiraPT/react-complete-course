import { createStore } from 'redux';


const initialState = { counter: 0, showCounter: true};

//we should provide a default state
const counterReducer = (state = initialState, action) => {
    //we should never manipulate state directly!!!
    let increment = 0;
    let showCounter = state.showCounter;

    if(action.type === 'INCREMENT') increment = 1;
    else if(action.type === 'DECREMENT') increment = -1;
    else if(action.type === 'INCREASE') increment = action.payload
    else if(action.type === 'TOGGLE_COUNTER') showCounter = !showCounter


    return {
        counter: state.counter + increment,
        showCounter: showCounter
    };
};

const store = createStore(counterReducer);

export default store;