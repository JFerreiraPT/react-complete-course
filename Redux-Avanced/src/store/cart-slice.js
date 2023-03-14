import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((sItem) => sItem.id === item.id);

      state.totalQuantity += item.quantity;
      state.totalAmount += item.quantity * item.price;

      state.changed = true;

      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice += item.quantity * item.price;
      } else {
        //we can only do this beacause we use redux toolkjt.
        //we are not using the real state, behinf the scenes redux toolkit transform this in functions
        state.items.push({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          name: item.title,
        });
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      state.totalQuantity--;
      state.totalAmount -= existingItem.price;

      existingItem.quantity--;
      existingItem.totalPrice -= existingItem.price;

      state.changed = true;

      if (existingItem.quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});



export const cartActions = cartSlice.actions;
export default cartSlice;
