export interface Usuario {
    id?: number,
    nomeCompleto: string,
    cpf: string,
    email: string,
    senha: string,
    tipoUsuario?: string,
    ativo?: boolean
}

export interface UsuarioUpdate {
    nomeCompleto: string,
    cpf: string,
    email: string
    tipoUsuario: string
}

export interface SenhaUpdate {
    senhaAntiga: string,
    novaSenha: string
}

export interface Mensagem {
    message: string
}