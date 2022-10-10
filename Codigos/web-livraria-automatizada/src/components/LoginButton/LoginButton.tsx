import { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import Storage from "../../configs/Storage";
import { logged } from "../../configs/store/actions";
import AuthContext from "../../contexts/AuthContext";
import { Usuario } from "../../models/Usuario";
import UserService from "../../services/UserService";

function LoginButton() {
  const { dispatch } = useContext(AuthContext);

  const onSuccess = (res: any) => {
    Storage.setSessionToken(res.tokenId);
    UserService.login()
      .then((response: any) => {
        const responseUser = response.data as Usuario;
        Storage.setToken(res.tokenId);
        Storage.setUser(responseUser);
        dispatch(logged(responseUser));
      })
      .catch((err: any) => {
        console.log(err);
        Storage.removeSessionToken();
      });
  };

  const onFailure = (err: any) => {
    //dispatch(message(ErrorUtils.getMessage(err, t)));
    console.log(err)
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_KEY as string}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}

export default LoginButton;
