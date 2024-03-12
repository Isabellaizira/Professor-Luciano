import prismaClient from '../../prisma'

interface Categoria {
    nome: string
}

class CategoriasServices {
    async criarCategoria({ nome }: Categoria) {
        const resposta = await prismaClient.categoria.create({
            data: {
                nome
            }
        })
        return {dados: 'Cadastro Efetuado com Sucesso'}
    }

    async listarCategoria(){
        const resposta = await prismaClient.categoria.findMany({})
        return resposta
    }
}

export { CategoriasServices }