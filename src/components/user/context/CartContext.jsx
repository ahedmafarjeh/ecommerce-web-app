import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
const CartContextProvider = ({children}) =>{
  const [cartCount, setCartCount] = useState(0);
  //This loading to notify the user that there is data coming from the endpoint
  // const [userLoading, setUserLoading] = useState();

  const getCartCount = async () =>{
    try {
      // Run loading
      // setUserLoading(true);
      const { data } = await axios.get('https://ecommerce-node4.onrender.com/cart',
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }

      );
      setCartCount(data.count);
      //turn off loading
      // setUserLoading(false);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(()=>{
  getCartCount();    
  },[]);
  return (
    // Here I will send the user Loading in value object 
    <CartContext.Provider value={{cartCount, setCartCount}} >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;