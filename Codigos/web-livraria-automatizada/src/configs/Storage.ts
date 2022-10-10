import { Usuario } from "../models/Usuario";

const ACCESS_TOKEN = '@Liby:token';
const LOGGED_USER = '@Liby:user';

export const StorageTokens = { ACCESS_TOKEN, LOGGED_USER };

function getSessionToken() {
  return sessionStorage.getItem(StorageTokens.ACCESS_TOKEN);
}

function setSessionToken(token: string) {
  sessionStorage.setItem(StorageTokens.ACCESS_TOKEN, token);
}

function removeSessionToken() {
  sessionStorage.removeItem(StorageTokens.ACCESS_TOKEN);
}

function setToken(token: string) {
  localStorage.setItem(StorageTokens.ACCESS_TOKEN, token);
}

function getToken() {
  return localStorage.getItem(StorageTokens.ACCESS_TOKEN);
}

function setUser(user: Usuario) {
  localStorage.setItem(StorageTokens.LOGGED_USER, JSON.stringify(user));
}

function getUser() {
  const strUser = localStorage.getItem(StorageTokens.LOGGED_USER);
  if (strUser) return JSON.parse(strUser);
  return null;
}

const Storage = {
  setToken,
  getToken,
  setUser,
  getUser,
  setSessionToken,
  removeSessionToken,
  getSessionToken,
};

export default Storage;
