export type Usuario = {
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
    name: "",
    picture: "",
    email: "",
    role: []
}
