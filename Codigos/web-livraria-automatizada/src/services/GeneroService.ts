import React from "react";
import api from "../configs/api";
import GeneroLivro from "../models/GeneroLivro";

export function findAll(){
    return api.get<GeneroLivro[]>(`/genero`);
}

const GeneroService = { findAll };

export default GeneroService;