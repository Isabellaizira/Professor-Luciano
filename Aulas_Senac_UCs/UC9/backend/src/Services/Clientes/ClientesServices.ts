import { response } from 'express'
import prismaClient from '../../prisma'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface Cliente {
    nome: string
    celular: string
    cpf: string
    email: string
    password: string
    cep: string
    rua: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
}

class ClienteServices {
    async criarCliente({
        nome,
        celular,
        cpf,
        email,
        password,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado
    }: Cliente) {

        const emailExiste = await prismaClient.cliente.findFirst({
            where: {
                email: email
            }
        })
        if (emailExiste) {
            throw new Error('E-mail já cadastrado')
        }
        const senhaCrypt = await hash(password, 8)

        await prismaClient.cliente.create({
            data: {
                nome: nome,
                celular: celular,
                cpf: cpf,
                email: email,
                senha: senhaCrypt,
                cep: cep,
                rua: rua,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado
            }
        })
        return ({ Dados: 'Cadastro Efetuado com Sucesso' })
    }
    async listarClientes() {
        const resposta = await prismaClient.cliente.findMany({})
        return resposta
    }

    async loginCliente({ email, password }: Cliente) {
        const cliente = await prismaClient.cliente.findFirst({
            where: {
                email: email
            }
        })
        const senha = await compare(password, cliente.senha)
        if (!senha) {
            throw new Error('Usuário/Senha incorretos')
        }
        const token = sign({
            id: cliente.id,
            email: cliente.email,
        },
            process.env.JWT_SECRET, {
            subject: cliente.id,
            expiresIn: 100000
        })
        return {
            id: cliente.id,
            email: cliente.email,
            token: token
        }
    }
}

export { ClienteServices }