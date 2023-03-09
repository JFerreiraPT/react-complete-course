//Objective is to manage data related to cart and provide context to all components
import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//state is always the last snapshot of the state managed by the reducer
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    let index = state.items.findIndex((item) => item.id === action.item.id);

    if (index !== -1) {
      let existingCartItem = state.items[index];

      existingCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      state.items[index] = existingCartItem;

      return {
        items: [...state.items],
        totalAmount: updatedTotalAmount
      } 
    }

    const updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === 'REMOVE') {
    let index = state.items.findIndex((item) => item.id === action.id);

    if (index !== -1) {
      let existingCartItem = state.items[index];

      existingCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      const updatedTotalAmount = state.totalAmount - existingCartItem.price;

      state.items[index] = existingCartItem;

      if(existingCartItem.amount <= 0) {
        state.items.splice(index, 1)
      }


      return {
        items: [...state.items],
        totalAmount: updatedTotalAmount,
      };
    }


  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
