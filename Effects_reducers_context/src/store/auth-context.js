import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserloggedInInfo = localStorage.getItem("isLoggedIn");
        if (storedUserloggedInInfo === "1") {
          setIsLoggedIn(true);
        }
      }, [isLoggedIn]);

    const logouthandler = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", 0);
    }

    const loginHandler = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", 1);
    }

    return <AuthContext.Provider 
        value={{isLoggedIn: isLoggedIn, onLogout: logouthandler, onLogin: loginHandler}}
    >{props.children}</AuthContext.Provider>
}

export default AuthContext;