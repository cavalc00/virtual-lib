import api from "../configs/api";

function saveLocation(idLocacao: string) {
  return api.post(`/locacao/${idLocacao}`);
}

const LocacaoService = { saveLocation };

export default LocacaoService;
