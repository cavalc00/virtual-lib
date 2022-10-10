import api from "../configs/api";
import { Usuario } from "../models/Usuario";

export function login(){
    return api.get<Usuario>('/user/login');
}

const UserService = { login };

export default UserService;