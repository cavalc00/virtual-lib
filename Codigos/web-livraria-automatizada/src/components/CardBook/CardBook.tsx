import React from "react";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Livro from "../../models/Livro";
import "./style.scss";

export type ContentCardProps = {
  livros?: Livro[];
  errorRequest: boolean;
  loading: boolean;
};

function CardBook(props: ContentCardProps) {
  const navigate = useNavigate();

  return (
    <Col>
      {props.loading ? (
        <ProgressBar animated now={100} />
      ) : (
        <Row className="row-blocks">
          {props.livros?.map((book, index) => (
            <Card className="book-style">
              <Card.Img variant="top" src={book.capa} />
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
              </Card.Body>
            </Card>
          ))}
        </Row>
      )}
    </Col>
  );
}

export default CardBook;
