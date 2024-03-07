export interface Ocorrencia {
    id?: number,
    usuarioId?: number,
    latitude: number,
    longitude: number,
    enderecoCompleto: string,
    urlImagem: string,
    logradouro: string,
    bairro: string,
    cep: string,
    numero?: number,
    dataOcorrencia: string,
    status: string
}

export interface Info {
    url: string,
    endereco: string,
    bairro: string,
    cep: string,
    data: string,
    status: string
}