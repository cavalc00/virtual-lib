import { useEffect, useState } from "react";
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
  const [idGeneroSelecionado, setIdGeneroSelecionado] = useState<any>();
  const [tituloSelecionado, setTituloSelecionado] = useState<string>("");
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

  function handleOnChangeTitle(event: any) {
    setTituloSelecionado(event.target.value);
    carregarLivros(idGeneroSelecionado, event.target.value);
  }

  function clearFilters() {
    setGeneroSelecionado("Todos");
    setTituloSelecionado("");
    carregarLivros();
  }

  async function carregarLivros(id?: any, titulo?: any) {
    LivroService.findAll(id, titulo)
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
      <Navbar bg="light" expand="sm" fixed="bottom">
        <Container fluid>
          <Nav>
            <Nav.Item className="nav-link">Gênero: </Nav.Item>
            <NavDropdown
              key={"up"}
              id={"dropdown-button-drop-up"}
              drop={"up"}
              title={generoSelecionado}
            >
              <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                {generos.map((genero, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => {
                      setGeneroSelecionado(genero.nome);
                      setIdGeneroSelecionado(genero.id);
                      carregarLivros(genero.id);
                    }}
                  >
                    {genero.nome}
                  </NavDropdown.Item>
                ))}
              </div>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Item className="nav-link">Título do livro: </Nav.Item>
            <Form className="flex-d">
              <Form.Control
                type="text"
                placeholder="Ex.: Sherlock Holmes: um estudo em vermelho"
                className="me-2"
                value={tituloSelecionado}
                aria-label="Search"
                name="title-book"
                onChange={(event) => {
                  handleOnChangeTitle(event);
                }}
              />
            </Form>
          </Nav>
          <Button
            variant="outline-danger"
            onClick={() => {
              clearFilters();
            }}
          >
            Limpar filtros
          </Button>
        </Container>
      </Navbar>

      <CardBook livros={livros} errorRequest={false} loading={false} />
    </>
  );
}

export default Home;
