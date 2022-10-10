import { Usuario } from '../../models/Usuario';
import { StoreAction, types } from './types';

export const logged = (data: Usuario): StoreAction => ({
  type: types.LOGGED,
  payload: data,
});

export default { logged };
