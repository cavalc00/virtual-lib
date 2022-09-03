import GeneroLivro from "./GeneroLivro";

type Livro = {
    id: number;
    generoLivro: GeneroLivro;
    titulo: string;
    autor: string;
    editora: string;
    anoLancamento: number;
    resumo: string;
    capa: string;
};

export default Livro;
