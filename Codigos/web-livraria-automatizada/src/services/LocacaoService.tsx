import api from "../configs/api";

function reserveBook(idLivro: string, email: string) {
  return api.post(`/locacao/${idLivro}?userLogin=${email}`);
}

function returnBook(idLivro: string) {
  return api.put(`/locacao/${idLivro}`);
}

function isReservedByUser(idLivro: string, email: string){
  const myParams = new URLSearchParams();

  if (idLivro) {
    myParams.append("idBook", idLivro);
  }

  if (email && email !== " ") {
    myParams.append("email", email);
  }

  const request = {
    params: myParams,
  };

  return api.get<Boolean>(`/locacao/compare`, request);
}

const LocacaoService = { reserveBook, returnBook, isReservedByUser};

export default LocacaoService;
