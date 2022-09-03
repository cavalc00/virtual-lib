import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import CardBook from "../../components/CardBook/CardBook";
import GeneroLivro from "../../models/GeneroLivro";
import Livro from "../../models/Livro";
import GeneroService from "../../services/GeneroService";
import LivroService from "../../services/LivroService";
import "./style.scss";

function Home() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [generos, setGeneros] = useState<GeneroLivro[]>([]);
  const [generoSelecionado, setGeneroSelecionado] = useState<string>("Todos");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    carregarLivros();
    carregarGeneros();
  }, []);

  function carregarGeneros() {
    GeneroService.findAll()
      .then((response) => {
        setGeneros(
          response.data.sort((a, b) => {
            if (a.nome > b.nome) {
              return 1;
            }
            if (a.nome < b.nome) {
              return -1;
            }
            return 0;
          })
        );
        setLoading(true);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function carregarLivros() {
    LivroService.findAll()
      .then((response) => {
        setLivros(
          response.data.sort((a, b) => {
            if (a.titulo > b.titulo) {
              return 1;
            }
            if (a.titulo < b.titulo) {
              return -1;
            }
            return 0;
          })
        );
        setLoading(true);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Navbar bg="light" expand="md" className="margin-down">
        <Container fluid>
          <Nav>
            <Nav.Item className="navm-left-center">Gênero: </Nav.Item>
            <div>
              <NavDropdown
                id="nav-dropdown"
                title={generoSelecionado}
                menuVariant="light"
              >
                {generos.map((genero, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => setGeneroSelecionado(genero.nome)}
                  >
                    {genero.nome}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </div>
            <Nav.Item className="navm-left-center">Nome do livro: </Nav.Item>
            <div className="margin-left">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Ex.: Sherlock Holmes: um estudo em vermelho"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Pesquisar</Button>
              </Form>
            </div>
          </Nav>
        </Container>
      </Navbar>

      <CardBook livros={livros} errorRequest={false} loading={false} />
    </>
  );
}

export default Home;
