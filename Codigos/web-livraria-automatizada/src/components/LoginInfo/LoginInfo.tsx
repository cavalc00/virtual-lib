import { Image } from "react-bootstrap";
import useLoggedUser from "../../configs/LoggedUser";
import "./style.scss";

function LoginInfo() {
  const loggedUser = useLoggedUser();

  return (
    <div>
      {loggedUser.email != "" ? (
        <p className="info-style">
          <Image className="profile-img" roundedCircle fluid src={loggedUser.picture} referrerPolicy="no-referrer"/>
          {`Olá, ${loggedUser.name}!`}
        </p>
      ) : (
        <div style={{ marginRight: "10px" }}> </div>
      )}
    </div>
  );
}

export default LoginInfo;
