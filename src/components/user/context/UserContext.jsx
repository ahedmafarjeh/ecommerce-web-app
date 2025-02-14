import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
const UserContextProvider = ({children}) =>{
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(false);
  const navigate = useNavigate();
  const logout = () =>{
      localStorage.removeItem('userToken');
      setUser(null);
      navigate('/auth/login');
    }
  const getUser = async () =>{
    try{
      setLoadingUser(true);
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
    }finally{
      setLoadingUser(false);
    }
  }
  useEffect(() =>{
    getUser();
  },[]);
  return (
    <UserContext.Provider  value={{user, setUser,logout,loadingUser}}>
        {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;