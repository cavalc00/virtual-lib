import api from "../configs/api";

function reserveBook(idLivro: string, email: string) {
  return api.post(`/locacao/${idLivro}?userLogin=${email}`);
}

function returnBook(idLivro: string) {
  return api.put(`/locacao/${idLivro}`);
}

const LocacaoService = { reserveBook, returnBook };

export default LocacaoService;
