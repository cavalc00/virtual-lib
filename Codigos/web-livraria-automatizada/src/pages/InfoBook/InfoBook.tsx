import React, { useEffect, useState } from "react";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Livro from "../../models/Livro";
import LivroService from "../../services/LivroService";
import "./style.scss";
import LocacaoService from "../../services/LocacaoService";
import Storage from "../../configs/Storage";

function InfoBook() {
  const { id } = useParams();
  const [livro, setLivro] = useState<Livro>();
  const localUser = Storage.getUser()

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
        {livro?.imageUrl ? (
          <Card.Img
            className="display-image"
            variant="top"
            src={livro.imageUrl}
          />
        ) : (
          <h4>Livro não possui imagem cadastrada!</h4>
        )}
      </>
    );
  }

  function sendReserve(idLivro: string){
    LocacaoService.reserveBook(idLivro, localUser.email)
    window.location.reload();
  }

  return (
    <div className="container">
      {renderPreviewImage()}
      <Card className="book-details">
        <div className="badge">
          {livro?.flag === "DISPONIVEL" ? (
            <Badge pill bg="success">
              Disponível
            </Badge>
          ) : livro?.flag === "RESERVADO" ? (
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
              { livro?.flag === "DISPONIVEL" ? (
                  <Button
                  variant="btn btn-success"
                  onClick={() => {
                    sendReserve(livro?.id);
                  }}
                  >
                    Reservar Livro
                    </Button>
              ) : livro?.flag === "RESERVADO" ? (
                <Button
                variant="btn btn-warning"
                onClick={() => {
                  sendReserve(livro?.id);
                }}
                >
                  Reservado
                  </Button>
              ) : (
                <Button
                variant="btn btn-danger"
                onClick={() => {
                  sendReserve(livro?.id);
                }}
                >
                  Livro Indisponível
                  </Button>
              )}
              
        </Card.Body>
      </Card>
    </div>
  );
}

export default InfoBook;
