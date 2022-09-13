import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Form, Button, FormGroup, Card, Spinner } from "react-bootstrap";
import GeneroLivro from "../../../models/GeneroLivro";
import Livro from "../../../models/Livro";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./style.scss";
import LivroService from "../../../services/LivroService";

type EditBookModalProps = {
  showEditBookModal: boolean | undefined;
  setShowEditBookModal: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  selectedBook: Livro | undefined;
  generos?: GeneroLivro[];
  onRefresh: () => void;
};

const convertBlobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

function EditBookModal(props: EditBookModalProps) {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [tituloLivro, setTituloLivro] = useState<string>();
  const [generoLivro, setGeneroLivro] = useState<string>();
  const [autorLivro, setAutorLivro] = useState<string>();
  const [anoLivro, setAnoLivro] = useState<string>();
  const [resumoLivro, setResumoLivro] = useState<string>();
  const [disponivelLivro, setDisponivelLivro] = useState<boolean>(false);
  const [editoraLivro, setEditoraLivro] = useState<string>();
  const [imageBook, setImageBook] = useState<Blob>();

  function fileSelectedHandler(event: any) {
    setImageBook(event.target.files[0]);
    setDisableButton(true);
    if (
      event.target.files[0] !== null &&
      (event.target.files[0].type == "image/jpeg" ||
        event.target.files[0].type == "image/png")
    ) {
      setDisableButton(false);
    }
  }

  function renderPreviewImage() {
    let image;
    if (imageBook) {
      image = URL.createObjectURL(imageBook);
    }
    return (
      <div className="display-image">
        {imageBook ? (
          <Card.Img variant="bottom" src={image} />
        ) : (
          <h4>Nenhuma imagem selecionada!</h4>
        )}
      </div>
    );
  }

  async function editBook() {
    setLoading(true);
    let base64String: any;

    if (imageBook) {
      base64String = await convertBlobToBase64(imageBook);
    }

    if(Number(anoLivro) == 0) setAnoLivro(undefined);

    const book: Livro = {
      id: props.selectedBook?.id,
      titulo: tituloLivro,
      autor: autorLivro,
      editora: editoraLivro,
      flagDisponivel: disponivelLivro,
      anoLancamento: Number(anoLivro),
      capa: base64String,
      resumo: resumoLivro,
      generoLivro: props.generos?.find((genero) => genero.nome == generoLivro),
    };

    LivroService.updateBook(book)
      .then((response) => {
        props.setShowEditBookModal(false);
        console.log(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        props.onRefresh();
        setLoading(false);
      });
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.showEditBookModal}
    >
      <Form validated>
        <Modal.Header
          closeButton
          onClick={() => {
            props.setShowEditBookModal(false);
            setImageBook(undefined);
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
              required
              className="form-control"
              placeholder="Titulo Livro"
              defaultValue={props.selectedBook?.titulo}
              onChange={(event) => {
                setDisableButton(false);
                setTituloLivro(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gênero</Form.Label>
            <Form.Select
              defaultValue={props.selectedBook?.generoLivro?.nome}
              required
              onChange={(event) => {
                setDisableButton(false);
                setGeneroLivro(event.target.value);
              }}
            >
              {props.generos?.map((genero, index) => (
                <option key={index}>{genero.nome}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor do Livro</Form.Label>
            <Form.Control
              required
              placeholder="Autor do Livro"
              defaultValue={props.selectedBook?.autor}
              onChange={(event) => {
                setDisableButton(false);
                setAutorLivro(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ano da Publicação</Form.Label>
            <Form.Control
              type="number"
              placeholder="Publicação do Livro"
              defaultValue={props.selectedBook?.anoLancamento}
              onChange={(event) => {
                setDisableButton(false);
                setAnoLivro(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Editora do Livro</Form.Label>
            <Form.Control
              placeholder="Editora do Livro"
              defaultValue={props.selectedBook?.editora}
              onChange={(event) => {
                setDisableButton(false);
                setEditoraLivro(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Resumo do Livro</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Resumo do Livro"
              defaultValue={props.selectedBook?.resumo}
              onChange={(event) => {
                setDisableButton(false);
                setResumoLivro(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Selecione uma foto:</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => {
                  fileSelectedHandler(event);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ marginTop: "10px" }}>
              <Form.Check
                type="checkbox"
                label="Livro disponível?"
                onChange={(event) => {
                  setDisableButton(false);
                  setDisponivelLivro(event.target.checked);
                }}
              />
            </Form.Group>
          </Form.Group>
          {renderPreviewImage()}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              editBook();
              setDisableButton(true);
            }}
            disabled={disableButton}
            type="submit"
          >
            {loading ? <Spinner animation={"border"} /> : "Salvar"}
          </Button>
          <Button
            onClick={() => {
              props.setShowEditBookModal(false);
              setImageBook(undefined);
            }}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditBookModal;
