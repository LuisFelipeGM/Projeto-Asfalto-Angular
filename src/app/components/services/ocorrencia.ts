export interface Ocorrencia {
    id?: number,
    usuarioId?: number,
    latitude: string,
    longitude: string,
    enderecoCompleto: string,
    urlImagem: string,
    logradouro: string,
    bairro: string,
    cep: string,
    numero?: number,
    dataOcorrencia: string,
    status: string
}