import api from "../configs/api";
import Livro from "../models/Livro";

function findAll(idGeneroLivro?: any) {
  const myParams = new URLSearchParams();
  if (idGeneroLivro) {
    myParams.append("idGeneroLivro", idGeneroLivro);
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
