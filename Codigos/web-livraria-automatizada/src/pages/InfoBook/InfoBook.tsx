import React, { useEffect, useState } from "react";
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

  return (
    <div className="teste">
      <p>{livro?.id}</p>
      <p>{livro?.titulo}</p>
      <p> {livro?.generoLivro?.nome}</p>
      <p> {livro?.autor}</p>
      <p> {livro?.editora}</p>
      <p> {livro?.resumo}</p>
    </div>
  );
}

export default InfoBook;
