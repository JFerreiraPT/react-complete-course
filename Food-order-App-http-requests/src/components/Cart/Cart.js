import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

import CartContext from "../../Store/cart-context";
import Checkout from "./Checkout";

import useFetch from "../../hooks/use-fecth";

const ORDERS_URL =
  "https://react-http-75b93-default-rtdb.firebaseio.com/orders.json";

const Cart = (props) => {
  const { post } = useFetch();
  const cartCtx = useContext(CartContext);

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totaAmount = `${cartCtx.totalAmount.toFixed(2)}€`;
  const hasItems = cartCtx.items.length > 0;

  const handlePostResult = (data) => {
    setIsSubmitting(false);
    setDidSubmit(true);

  }

  //to receive item here ir was bind to function
  const onAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const onOrderHandler = () => {
    setShowCheckoutForm(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);

    post(
      {
        url: ORDERS_URL,
        body: { user: userData, orderItems: cartCtx.items },
        headers: { "Content-Type": "application/json" },
      },
      handlePostResult
    );
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
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


  
  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button onClick={onOrderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = <>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totaAmount}</span>
      </div>
      {showCheckoutForm && (
        <Checkout
          onCancel={props.onHideCart}
          onSubmitOrder={submitOrderHandler}
        />
      )}
      {!showCheckoutForm && modalActions}
  </>

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = <p>Successfully sent the order!! </p>

  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
