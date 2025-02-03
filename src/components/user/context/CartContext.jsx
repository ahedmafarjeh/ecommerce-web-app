import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
const CartContextProvider = ({children}) =>{
  const [cartCount, setCartCount] = useState(0);

  const getCartCount = async () =>{
    try {
      
      const { data } = await axios.get('https://ecommerce-node4.onrender.com/cart',
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }

      );
      setCartCount(data.count);
      
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(()=>{
  getCartCount();    
  });
  return (
    <CartContext.Provider value={{cartCount, setCartCount}} >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;