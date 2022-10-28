import { ByteLengthQueuingStrategy } from "node:stream/web";
import GeneroLivro from "./GeneroLivro";

type Livro = {
  id?: any;
  generoLivro: GeneroLivro | undefined;
  titulo: string | undefined;
  autor: string | undefined;
  editora?: string | undefined;
  anoLancamento?: number;
  resumo?: string | undefined;
  imageUrl?: any | undefined;
  flagDisponivel: boolean;
};

export default Livro;
