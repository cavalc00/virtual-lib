import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Livro from "../../../models/Livro";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LivroService from "../../../services/LivroService";

type DeleteBookModalProps = {
  showDeleteBookModal: boolean | undefined;
  setShowDeleteBookModal: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  selectedBook: Livro | undefined;
  onRefresh: () => void;
};

function DeleteBookModal(props: DeleteBookModalProps) {
  function deleteBook(idLivro: any) {
    LivroService.deleteBook(idLivro)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        props.setShowDeleteBookModal(false);
        props.onRefresh();
      });
  }

  return (
    <Modal show={props.showDeleteBookModal}>
      <Modal.Header closeButton>
        <Modal.Title>Atenção! Esta ação não pode ser desfeita!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que deseja deletar este livro?
        <p>Livro a ser deletado: {props.selectedBook?.titulo}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => props.setShowDeleteBookModal(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        <Button
          variant="success"
          onClick={() => deleteBook(props.selectedBook?.id)}
        >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteBookModal;
