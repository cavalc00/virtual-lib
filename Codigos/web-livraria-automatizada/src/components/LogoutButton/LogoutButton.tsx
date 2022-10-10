import { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import Storage from "../../configs/Storage";
import { logged } from "../../configs/store/actions";
import AuthContext from "../../contexts/AuthContext";
import { EMPTY_USER } from "../../models/Usuario";

function LogoutButton() {
  const {dispatch} = useContext(AuthContext);

  const onSuccess = () => {
    Storage.removeSessionToken();
    Storage.setUser(EMPTY_USER);
    dispatch(logged(EMPTY_USER));
    console.log("Logout Success!");
  };

  const onFailure = () => {
    console.log("Logout failed");
  };

  return (
    <div>
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_KEY as string}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default LogoutButton;
