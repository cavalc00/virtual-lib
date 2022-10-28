import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Form, Button, FormGroup, Card, Spinner } from "react-bootstrap";
import GeneroLivro from "../../../models/GeneroLivro";
import Livro from "../../../models/Livro";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./style.scss";
import LivroService from "../../../services/LivroService";
import { storage } from "../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

type EditBookModalProps = {
  showEditBookModal: boolean | undefined;
  setShowEditBookModal: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  selectedBook: Livro | undefined;
  generos?: GeneroLivro[];
  onRefresh: () => void;
};

// const convertBlobToBase64 = (blob: Blob) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onerror = reject;
//     reader.onload = () => {
//       resolve(reader.result);
//     };
//     reader.readAsDataURL(blob);
//   });

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
  const [imageBook, setImageBook] = useState<File>();

  function fileSelectedHandler(event: any) {
    setImageBook(event.target.files[0]);
    setDisableButton(true);
    if (imageBook !== undefined) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }

  async function editBook() {
    setLoading(true);
    if (Number(anoLivro) == 0) setAnoLivro(undefined);
    const book: Livro = {
      id: props.selectedBook?.id,
      titulo: tituloLivro,
      autor: autorLivro,
      editora: editoraLivro,
      flagDisponivel: disponivelLivro,
      anoLancamento: Number(anoLivro),
      imageUrl: imageBook,
      resumo: resumoLivro,
      generoLivro: props.generos?.find((genero) => genero.nome == generoLivro),
    };

    if (imageBook !== undefined) {
      const imageRef = ref(storage, `Capas/${imageBook.name + uuidv4()}`);
      uploadBytes(imageRef, imageBook)
        .then((response) => {
          alert("Upload feito com sucesso!");
          console.log(response);
        })
        .catch((error) => {
          alert("Upload falhou");
          console.log(error);
        });
    }

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
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Selecione uma imagem de capa:</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => {
                fileSelectedHandler(event);
              }}
            />
          </Form.Group>
          <div className="space-between">
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onClick={() => {
              editBook();
              setDisableButton(true);
            }}
            disabled={disableButton}
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
