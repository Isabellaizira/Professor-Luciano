import prismaClient from '../../prisma'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface CriarMotoqueiro {
    nome: string
    nusuarios: string
    password: string
}

interface Token {
    id:string
}

interface Login {
    nusuario: string
    password: string
}

class MotoqueirosServices {
    async criarMotoqueiro({ nome, nusuarios, password }: CriarMotoqueiro) {
        if (!nome || !nusuarios || !password) {
            throw new Error('Existem Campos em Branco')
        }
        const usuarioExiste = await prismaClient.motoqueiro.findFirst({
            where: {
                nusuario: nusuarios
            }
        })
        if (usuarioExiste) {
            throw new Error('usuario já cadastrado')
        }
        const senhaCrypt = await hash(password, 8)
        await prismaClient.motoqueiro.create({
            data: {
                nome: nome,
                nusuario: nusuarios,
                senha: senhaCrypt
            }
        })
        return { Resposta: 'Cadastro Efetuado com sucesso' }
    }

    async ListarToken({ id }: Token) {
        const resposta = await prismaClient.motoqueiro.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                nome: true
            }
        })
        return resposta
    }

    async loginMoto({ nusuario, password }: Login) {
      const usuario = await prismaClient.motoqueiro.findFirst({
        where: {
            nusuario:nusuario
        }
      })
      if (!usuario) {
        throw new Error('Usuario ou senha estão incorretos')
      }
      const autenticado = await compare(password, usuario.senha)
      if (!autenticado) {
          throw new Error('Usuario/Senha estão incorretos')
      }

      const token = sign({
          id: usuario.id,
          nusuario: usuario.nusuario
          
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
          token: token
      }
  }

}

export { MotoqueirosServices }