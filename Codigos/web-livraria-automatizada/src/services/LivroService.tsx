import api from "../configs/api";
import Livro from "../models/Livro";

function findAll(idGeneroLivro?: any, tituloLivro?: string) {
  const myParams = new URLSearchParams();
  if (idGeneroLivro) {
    myParams.append("idGeneroLivro", idGeneroLivro);
  }

  if(tituloLivro && tituloLivro != " "){
    myParams.append("nomeLivro", tituloLivro);
  }

  const request = {
    params: myParams,
  };

  return api.get<Livro[]>(`/livro`, request);
}

function findById(idLivro: any) {
  return api.get<Livro>(`/livro/${idLivro}`);
}

const LivroService = { findAll, findById };

export default LivroService;
