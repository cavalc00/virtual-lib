export type Usuario = {
    id: number | null;
    name: string;
    picture: string;
    email: string;
    role: Perfil[];
}

export type Perfil = {
    id: number;
    tipo: string;
}

export const EMPTY_USER = {
    id: null,
    name: "",
    picture: "",
    email: "",
    role: []
}
