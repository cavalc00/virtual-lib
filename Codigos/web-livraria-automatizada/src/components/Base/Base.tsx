import { Container } from "react-bootstrap";
import MainRoutes from "../../routes";
import Header from "../Header/Header";

function Base() {
  return (
    <>
      <Container fluid>
        <Header />
        <MainRoutes />
      </Container>
    </>
  );
}

export default Base;
