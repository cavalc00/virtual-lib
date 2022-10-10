import { gapi } from "gapi-script";
import { useContext, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import LoginButton from "../LoginButton/LoginButton";
import LoginInfo from "../LoginInfo/LoginInfo";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./style.scss";

function Header() {
  const { state } = useContext(AuthContext);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_KEY as string,
      });
    }

    gapi.load("client:auth2", start);
  });

  return (
    <Navbar className="margin-down" bg="light" expand="sm" fixed="top">
      <Container fluid>
        <Navbar.Brand>Livraria automatizada</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Lista de livros</Nav.Link>
            <Nav.Link href="/about">Sobre</Nav.Link>
          </Nav>
          <Nav className="info-container">
            <LoginInfo />
          </Nav>
          <div className="login-style">
            {state.user.email != "" ? <LogoutButton /> : <LoginButton />}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
