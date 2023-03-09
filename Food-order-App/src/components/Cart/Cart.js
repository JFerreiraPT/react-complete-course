import { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

import CartContext from '../../Store/cart-context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totaAmount = `${cartCtx.totalAmount.toFixed(2)}€`;
  const hasItems = cartCtx.items.length > 0;

  //to receive item here ir was bind to function
  const onAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});

  };

  const onRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem 
        onAdd={onAddHandler.bind(null, item)}
        onRemove={onRemoveHandler.bind(null, item.id)}
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        ></CartItem>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totaAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes['button--alt']}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
