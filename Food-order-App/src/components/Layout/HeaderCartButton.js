import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../Store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const { items } = cartCtx;

  const btnClasses = `${classes.button} ${    
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if(items.length === 0) return;
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
        setBtnIsHighlighted(false)
    }, 100)

    //this is a clean function and its called automatically by react
    return () => {
        clearTimeout(timer);
    }

  }, [items]);

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
