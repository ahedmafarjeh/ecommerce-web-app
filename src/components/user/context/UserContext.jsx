import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const UserContextProvider = ({children}) =>{
  const [user, setUser] = useState();
  const getUser = async () =>{
    try{
      const {data} = await axios.get('https://ecommerce-node4.onrender.com/user/profile',
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }
      );
      setUser(data.user);
    }catch(e){
      console.log(e);
    }
  }
  useEffect(() =>{
    getUser();
  });
  return (
    <UserContext.Provider  value={{user}}>
        {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;