import api from "../configs/api";
import Livro from "../models/Livro";

export function findAll(idGeneroLivro?: any) {
   
  const myParams = new URLSearchParams();
  if (idGeneroLivro) {
    myParams.append("idGeneroLivro", idGeneroLivro);
  }

  const request = {
   params: myParams,
  };

  return api.get<Livro[]>(`/livro`, request);
}

const LivroService = { findAll };

export default LivroService;
