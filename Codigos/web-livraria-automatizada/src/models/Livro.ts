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
  capa?: any | undefined;
  flag: 'DISPONIVEL' | 'INDISPONIVEL' | 'RESERVADO';
  prateleira? : number;
};

export default Livro;
