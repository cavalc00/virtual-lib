import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Livro from "../../models/Livro";
import "./style.scss";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import GeneroLivro from "../../models/GeneroLivro";
import GeneroService from "../../services/GeneroService";

export type ContentCardProps = {
  livros?: Livro[];
  generos?: GeneroLivro[];
  errorRequest: boolean;
  loading: boolean;
};

function CardBook(props: ContentCardProps) {
  const navigate = useNavigate();
  const [showEditBookModal, setShowEditBookModal] = useState<boolean>();
  const [selectedBook, setSelectedBook] = useState<Livro>();

  function openEditBookModal(b: Livro) {
    setSelectedBook(b);
    setShowEditBookModal(true);
  }

  return (
    <>
      <Col className="fit-page">
        {props.loading ? (
          <ProgressBar animated now={100} />
        ) : (
          <Row className="row-blocks">
            {props.livros?.map((book, index) => (
              <Card className="book-style" key={index}>
                <div>
                  <Card.Img
                    className="image-format"
                    variant="top"
                    src={`data:image/jpeg;base64,${book.capa}`}
                  />
                </div>
                <Card.Body className="ml-3">
                  <Card.Title className="title-style">{book.titulo}</Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <label className="label-style">Gênero:</label>{" "}
                      {book.generoLivro.nome}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <label className="label-style">Autor:</label> {book.autor}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <label className="label-style">Ano de lançamento:</label>{" "}
                      {book.anoLancamento}
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body className="button-style">
                    <Button
                      size="sm"
                      onClick={() => navigate(`/info-book/${book.id}`)}
                    >
                      Verificar disponibilidade
                    </Button>
                  </Card.Body>

                  <div className="edit-buttons-style">
                    <Button size="sm" onClick={() => openEditBookModal(book)}>
                      <FontAwesomeIcon icon={faPencil} />
                    </Button>

                    <Button variant="danger" size="sm" style={{marginLeft: "10px"}}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Row>
        )}
      </Col>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showEditBookModal}
      >
        <Modal.Header
          closeButton
          onClick={() => {
            setShowEditBookModal(false);
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Livro
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Titulo do Livro</Form.Label>
            <Form.Control
              placeholder="Titulo Livro"
              defaultValue={selectedBook?.titulo}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gênero</Form.Label>
            <Form.Select defaultValue={selectedBook?.generoLivro.nome}>
              {props.generos?.map((genero, index) => (
                <option key={index}>{genero.nome}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor do Livro</Form.Label>
            <Form.Control
              placeholder="Autor do Livro"
              defaultValue={selectedBook?.autor}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ano da Publicação</Form.Label>
            <Form.Control
              placeholder="Publicação do Livro"
              defaultValue={selectedBook?.anoLancamento}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Resumo do Livro</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Resumo do Livro"
              defaultValue={selectedBook?.resumo}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Disponível" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowEditBookModal(false);
            }}
          >
            Salvar
          </Button>
          <Button
            onClick={() => {
              setShowEditBookModal(false);
            }}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CardBook;
