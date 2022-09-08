import { Modal, Form, Button } from "react-bootstrap";
import GeneroLivro from "../../../models/GeneroLivro";
import Livro from "../../../models/Livro";

type EditBookModalProps = {
  showEditBookModal: boolean | undefined;
  setShowEditBookModal: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  selectedBook: Livro | undefined;
  generos? : GeneroLivro[] | undefined;
};

function EditBookModal(props: EditBookModalProps) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.showEditBookModal}
    >
      <Modal.Header
        closeButton
        onClick={() => {
            props.setShowEditBookModal(false);
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
            defaultValue={props.selectedBook?.titulo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gênero</Form.Label>
          <Form.Select defaultValue={props.selectedBook?.generoLivro.nome}>
            {props.generos?.map((genero, index) => (
              <option key={index}>{genero.nome}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor do Livro</Form.Label>
          <Form.Control
            placeholder="Autor do Livro"
            defaultValue={props.selectedBook?.autor}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ano da Publicação</Form.Label>
          <Form.Control
            placeholder="Publicação do Livro"
            defaultValue={props.selectedBook?.anoLancamento}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Resumo do Livro</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Resumo do Livro"
            defaultValue={props.selectedBook?.resumo}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Disponível" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.setShowEditBookModal(false);
          }}
        >
          Salvar
        </Button>
        <Button
          onClick={() => {
            props.setShowEditBookModal(false);
          }}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditBookModal;
