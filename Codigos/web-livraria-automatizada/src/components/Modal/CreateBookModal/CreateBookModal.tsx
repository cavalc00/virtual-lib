import { faPlus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Card, Form, Modal, Spinner } from "react-bootstrap";
import GeneroLivro from "../../../models/GeneroLivro";
import Livro from "../../../models/Livro";
import LivroService from "../../../services/LivroService";
import "./style.scss";

type CreateBookModalProps = {
  generos: GeneroLivro[];
  showCreateBookModal: boolean;
  setShowCreateBookModal: React.Dispatch<React.SetStateAction<boolean>>;
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

function CreateBookModal(props: CreateBookModalProps) {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [tituloLivro, setTituloLivro] = useState<string>();
  const [generoLivro, setGeneroLivro] = useState<string>();
  const [autorLivro, setAutorLivro] = useState<string>();
  const [anoLivro, setAnoLivro] = useState<string>();
  const [resumoLivro, setResumoLivro] = useState<string>();
  const [disponivelLivro, setDisponivelLivro] = useState<'DISPONIVEL' | 'INDISPONIVEL' | 'RESERVADO'>('INDISPONIVEL');
  const [editoraLivro, setEditoraLivro] = useState<string>();
  const [imageBook, setImageBook] = useState<Blob>();
  const [tipImage, setImageTip] = useState<string>(
    "Escolha uma imagem no formato jpg ou png."
  );
  const [prateleira, setPrateleira] = useState<string>();

  function fileSelectedHandler(event: any) {
    setImageBook(event.target.files[0]);
    setDisableButton(true);
    if (
      event.target.files[0] !== null &&
      (event.target.files[0].type == "image/jpeg" ||
        event.target.files[0].type == "image/png")
    ) {
      setImageTip("Imagem no formato correto.");
      validateForm();
    } else {
      setImageTip("Imagem no formato incorreto.");
      validateForm();
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

  function clearAllStates() {
    setTituloLivro(undefined);
    setGeneroLivro(undefined);
    setAutorLivro(undefined);
    setAnoLivro(undefined);
    setResumoLivro(undefined);
    setDisponivelLivro('INDISPONIVEL');
    setEditoraLivro(undefined);
    setImageBook(undefined);
    setPrateleira(undefined);
    setImageTip("Escolha uma imagem no formato jpg ou png.");
  }

  async function saveBook() {
    setLoading(true);
    let base64String: any;

    if (imageBook) {
      base64String = await convertBlobToBase64(imageBook);
    }

    if (Number(anoLivro) == 0) setAnoLivro(undefined);

    const book: Livro = {
      titulo: tituloLivro,
      autor: autorLivro,
      editora: editoraLivro,
      flag: disponivelLivro,
      anoLancamento: Number(anoLivro),
      capa: base64String,
      resumo: resumoLivro,
      generoLivro: props.generos?.find((genero) => genero.nome == generoLivro),
      prateleira: Number(prateleira)
    };

    LivroService.saveBook(book)
      .then((response) => {
        props.setShowCreateBookModal(false);
        console.log(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        props.onRefresh();
        setLoading(false);
      });
  }

  function validateForm() {
    if (
      tituloLivro &&
      tituloLivro?.length > 0 &&
      anoLivro &&
      anoLivro?.length > 0 &&
      autorLivro &&
      autorLivro?.length > 0
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }

  return (
    <Modal
      onExit={() => clearAllStates()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.showCreateBookModal}
    >
      <Form validated>
        <Modal.Header
          closeButton
          onClick={() => {
            props.setShowCreateBookModal(false);
            clearAllStates();
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Adicionar Livro
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Titulo do Livro</Form.Label>
            <Form.Control
              required
              className="form-control"
              placeholder="Titulo Livro"
              onChange={(event) => {
                setTituloLivro(event.target.value);
                validateForm();
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gênero</Form.Label>
            <Form.Select
              required
              onChange={(event) => {
                setGeneroLivro(event.target.value);
                validateForm();
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
              onChange={(event) => {
                setAutorLivro(event.target.value);
                validateForm();
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ano da Publicação</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Publicação do Livro"
              onChange={(event) => {
                setAnoLivro(event.target.value);
                validateForm();
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Editora do Livro</Form.Label>
            <Form.Control
              placeholder="Editora do Livro"
              onChange={(event) => {
                setEditoraLivro(event.target.value);
                validateForm();
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Resumo do Livro</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Resumo do Livro"
              onChange={(event) => {
                setResumoLivro(event.target.value);
                validateForm();
              }}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Selecione uma foto:</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => {
                fileSelectedHandler(event);
                validateForm();
              }}
            />
            <Form.Text>{tipImage}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prateleira</Form.Label>
            <Form.Control
              type="number"
              placeholder="Prateleira do Livro"
              onChange={(event) => {
                setDisableButton(false);
                setPrateleira(event.target.value);
              }}
            />
          </Form.Group>

          <div className="space-between">
            <Form.Group className="mb-3" style={{ marginTop: "10px" }}>
              <Form.Check
                type="checkbox"
                label="Livro disponível?"
                onChange={(event) => {
                  if(event.target.checked){
                    setDisponivelLivro('DISPONIVEL');
                  } else {
                    setDisponivelLivro('INDISPONIVEL');
                  }
                  validateForm();
                }}
              />
            </Form.Group>
            {renderPreviewImage()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onClick={() => {
              saveBook();
              setDisableButton(true);
            }}
            disabled={disableButton}
          >
            {loading ? <Spinner animation={"border"} /> : "Salvar"}
          </Button>
          <Button
            onClick={() => {
              props.setShowCreateBookModal(false);
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

export default CreateBookModal;
