import prismaClient from '../../prisma'

class ListarProdutosServices {
    async execute(){
        const produtos = await prismaClient.produto.findMany({})
        return (produtos)
    }
}

export { ListarProdutosServices }