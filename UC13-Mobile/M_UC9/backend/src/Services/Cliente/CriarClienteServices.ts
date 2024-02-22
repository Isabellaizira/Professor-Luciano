import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface CriarClientes {

    nome: string
    telefone: string
    cpf_cnpj: string
    rg_ie: string
    cep: string
    rua: string
    bairro: string
    nCasa: string
    cidade: string
    estado: string
    email: string
    password: string
}

class CriarClienteServices {
    async execute({
        nome, telefone, cpf_cnpj, rg_ie, cep, rua, bairro, nCasa, cidade, estado, email, password }: CriarClientes) {

        if (!nome || !telefone || !cpf_cnpj || !rg_ie || !cep ||!rua || !bairro || !nCasa || !cidade || !estado || !email || !password) {
            throw new Error('Existem Campos em Branco')
        }

        const emailExiste = await prismaClient.cliente.findFirst({
            where: {
                email: email
            }
        })
        if (emailExiste) {
            throw new Error('usuario já Cadastrado')
        }

        const passwordCrypt = await hash(password, 8)
        await prismaClient.cliente.create({
            data: {
                nome: nome,
                telefone: telefone,
                cpf_cnpj: cpf_cnpj,
                rg_ie: rg_ie,
                cep: cep,
                rua: rua,
                bairro: bairro,
                nCasa: nCasa,
                cidade: cidade,
                estado: estado,
                email: email,
                senha: passwordCrypt
            }
        })
        return { Resposta: 'Cadastro Efetuado com Sucesso' }
    }
}

export { CriarClienteServices }
