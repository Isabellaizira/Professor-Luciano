import prismaClient from '../../prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface LoginCliente {
    email: string
    password: string
}

class LoginClienteServices {
    async execute({ email, password }: LoginCliente) {
        const usuario = await prismaClient.cliente.findFirst({
            where: {
                email: email
            }
        })
        if (!usuario) {
            throw new Error('Usuario/Senha estão incorretos')
        }
        const autenticado = await compare(password, usuario.senha)
        if (!autenticado) {
            throw new Error('Usuario/Senha estão incorretos')
        }

        const token = sign({
            id: usuario.id,
            email: usuario.email

        },
            process.env.JWT_SECRET,
            {
                subject: usuario.id,
                expiresIn: 100000
            }
        )
        return {
            id: usuario.id,
            nome: usuario.nome,
            telefone: usuario.telefone,
            email: usuario.email,
            token: token
        }
    }
}

export { LoginClienteServices }