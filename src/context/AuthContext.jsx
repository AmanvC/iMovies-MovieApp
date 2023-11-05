import { createContext, useEffect, useState } from "react";
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemInLocalStorage } from "../utils/local-storage";
import { LOCALSTORAGE_TOKEN_KEY } from "../utils/constants";
import jwt from "jwt-decode";
import { postDataToBackendApi } from "../utils/backend-api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [userLoading, setUserLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
		if (userToken) {
			let user = jwt(userToken);
			setCurrentUser(user);
		}
		setUserLoading(false);
	}, []);

	const login = async(username, password) => {
    try{
      setUserLoading(true);
      const res = await postDataToBackendApi('/user/create-session', {
        username, 
        password
      })
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, res.data.token);
      setCurrentUser(jwt(res.data.token));
      setUserLoading(false);
      navigate("/user/home");
      return "";
    }
    catch(message){
      setUserLoading(false);
      return message;
    }
	}

	const logout = () => {
		setCurrentUser(null);
		removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)
	}

	return(
		<AuthContext.Provider
			value={{currentUser, userLoading, login, logout, setCurrentUser}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;