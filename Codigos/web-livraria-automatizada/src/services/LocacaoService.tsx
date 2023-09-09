import api from "../configs/api";

function reserveBook(idLocacao: string, email: string) {
    return api.post(`/locacao/${idLocacao}?userLogin=${email}`);
}

const LocacaoService = { reserveBook };

export default LocacaoService;