import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {

const [token, setToken] = useState(null)


 //*************control user data state***********
 const [userData, setUserData] = useState(null);

 //**************save user data *********************
 let saveUserData = () => {
   let encodedToken = localStorage.getItem("token");
   let decodedToken = jwtDecode(encodedToken);
   console.log(decodedToken)
   setUserData(decodedToken);
 };

//to handle user refresh
useEffect(() => {
    if(localStorage.getItem("token") !== null){
        setToken(localStorage.getItem("token"))
        saveUserData()
    }
    
}, [])
//to handle user refresh
useEffect(() => {
    if(localStorage.getItem("token")){
        saveUserData()
    }
    
}, [])


  return <authContext.Provider value={ { userData,saveUserData,token ,setToken }}>
    {children}
    </authContext.Provider>;
}
