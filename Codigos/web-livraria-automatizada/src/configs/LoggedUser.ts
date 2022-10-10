import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { EMPTY_USER } from "../models/Usuario";
import Storage from "./Storage";
import { logged } from "./store/actions";



const useLoggedUser = () => {
  const { state, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const localUser = Storage.getUser();
    if (localUser != null && state.user === EMPTY_USER) {
      dispatch(logged(localUser));
    }
  }, []);
  return state.user;
};


export default useLoggedUser;