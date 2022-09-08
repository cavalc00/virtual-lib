import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Livro from "../../../models/Livro";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type DeleteBookModalProps = {
  showDeleteBookModal: boolean | undefined;
  setShowDeleteBookModal: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  selectedBook: Livro | undefined;
};

function DeleteBookModal(props: DeleteBookModalProps) {
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
          onClick={() => props.setShowDeleteBookModal(false)}
        >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteBookModal;
