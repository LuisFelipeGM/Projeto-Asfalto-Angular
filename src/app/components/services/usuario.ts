export interface Usuario {
    id?: number,
    nomeCompleto: string,
    cpf: string,
    email: string,
    senha: string,
    tipoUsuario?: string,
    ativo?: boolean
}