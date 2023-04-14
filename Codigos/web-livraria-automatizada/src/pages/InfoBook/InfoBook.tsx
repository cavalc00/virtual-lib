import React, { useEffect, useState } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Livro from "../../models/Livro";
import LivroService from "../../services/LivroService";
import "./style.scss";

function InfoBook() {
  const { id } = useParams();
  const [livro, setLivro] = useState<Livro>();

  useEffect(() => {
    getBookById();
  }, [id]);

  function getBookById() {
    LivroService.findById(id)
      .then((response) => setLivro(response.data))
      .catch((error) => console.log(error));
  }

  function renderPreviewImage() {
    return (
      <>
        {livro?.capa ? (
          <Card.Img
            className="display-image"
            variant="top"
            src={`data:image/jpeg;base64,${livro.capa}`}
          />
        ) : (
          <h4>Livro não possui imagem cadastrada!</h4>
        )}
      </>
    );
  }

  return (
    <div className="container">
      {renderPreviewImage()}
      <Card className="book-details">
        <div className="badge">
          {livro?.flag == "DISPONIVEL" ? (
            <Badge pill bg="success">
              Disponível
            </Badge>
          ) : livro?.flag == "RESERVADO" ? (
            <Badge pill bg="primary">
              Reservado
            </Badge>
          ) : (
            <Badge pill bg="danger">
              Indisponivel
            </Badge>
          )}
        </div>
        <Card.Body>
          <Card.Title>{livro?.titulo}</Card.Title>
          <Card.Text>{livro?.resumo}</Card.Text>
          <ListGroup variant="flush">
            <br />
            <Card.Title>Características: </Card.Title>
            <ul>
              <li>{`Está obra foi escrita por ${livro?.autor}, no ano de ${livro?.anoLancamento}.`}</li>
              <li>{`Pode ser classificado pelo genêro de ${livro?.generoLivro?.nome}.`}</li>
              <li>{`É disponível pela editora ${livro?.editora}`}</li>
            </ul>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default InfoBook;
