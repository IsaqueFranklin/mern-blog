import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider ({children}){

    const [userInfo, setUserInfo] = useState({});

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}} >
            {children}
        </UserContext.Provider>
    );
}

/*Context is designed to share data that can be considered 
“global” for a tree of React components, such as the current
authenticated user, theme, or preferred language.*/