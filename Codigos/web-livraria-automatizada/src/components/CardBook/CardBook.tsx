import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

export type ContentCardProps = {
  capa?: any;
  titulo: string;
  resumo: string;
  genero: string;
  autor: string;
  ano: number;
};

function CardBook(props: ContentCardProps) {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props?.capa} />
        <Card.Body>
          <Card.Title>{props.titulo}</Card.Title>
          <Card.Text>
            {props.resumo}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{props.genero}</ListGroup.Item>
          <ListGroup.Item>{props.autor}</ListGroup.Item>
          <ListGroup.Item>{props.ano}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button>Verificar disponibilidade</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardBook;
