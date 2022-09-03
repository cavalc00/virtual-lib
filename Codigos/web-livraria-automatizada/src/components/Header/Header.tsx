import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import GeneroLivro from "../../models/GeneroLivro";
import GeneroService from "../../services/GeneroService";
import "./style.scss";

function Header() {
  return (
    <Navbar bg="light" expand="md" className="margin-down">
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
            <Nav.Link href="about">Sobre</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
