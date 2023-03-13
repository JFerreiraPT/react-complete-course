import React, {useState} from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./Store/cart-provider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  
  //manage modal state, show or not
  const showCartHandler = () => {
    setCartIsShown(true);

  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }


  return (
    <CartProvider>
    {cartIsShown && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
