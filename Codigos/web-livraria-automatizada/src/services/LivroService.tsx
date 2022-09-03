import api from "../configs/api";
import Livro from "../models/Livro";

export function findAll() {
   return api.get<Livro[]>(`/livro`);
}

const LivroService = { findAll };

export default LivroService;
