import { createContext } from "react";
import { useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    //making sure if we have the user info then give below context to the children
    const [userInfo, setUserInfo] = useState();
    //basically making sure if we have user is logged in or not

    //to enable user to stay login even after refresh
    useEffect(()=> {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/profile`,{credentials: 'include'})
       .then(response => response.json())
       .then(data => setUserInfo(data.userInfo))
    }, []);

    return(
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}