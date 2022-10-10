import { Usuario } from "../../models/Usuario";

export type UserStore = {
  user: Usuario;
};

export type StoreAction = {
  type: string;
  payload?: Usuario
};

export const types = {
  LOGGED: 'LOGGED',
};
