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
import EditBookModal from "../Modal/EditBookModal/EditBookModal";
import DeleteBookModal from "../Modal/DeleteBookModal/DeleteBookModal";

export type ContentCardProps = {
  livros?: Livro[];
  generos?: GeneroLivro[];
  errorRequest: boolean;
  loading: boolean;
};

function CardBook(props: ContentCardProps) {
  const navigate = useNavigate();
  const [showEditBookModal, setShowEditBookModal] = useState<boolean>();
  const [showDeleteBookModal, setShowDeleteEditBookModal] = useState<boolean>();
  const [selectedBook, setSelectedBook] = useState<Livro>();

  function openDeleteBookModal(b: Livro) {
    setSelectedBook(b);
    setShowDeleteEditBookModal(true);
  }

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

                    <Button
                      variant="danger"
                      size="sm"
                      style={{ marginLeft: "10px" }}
                      onClick={() => openDeleteBookModal(book)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Row>
        )}
      </Col>
      <EditBookModal
        selectedBook={selectedBook}
        showEditBookModal={showEditBookModal}
        setShowEditBookModal={setShowEditBookModal}
        generos={props.generos}
      />
      <DeleteBookModal
        selectedBook={selectedBook}
        setShowDeleteBookModal={setShowDeleteEditBookModal}
        showDeleteBookModal={showDeleteBookModal}
      />
    </>
  );
}

export default CardBook;
