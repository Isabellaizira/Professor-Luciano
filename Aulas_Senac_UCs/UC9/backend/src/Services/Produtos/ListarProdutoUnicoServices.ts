import prismaClient from '../../prisma'

interface ListarProduto{
    id: string
}

class ListarProdutoUnicoServices{
    async execute({ id }: ListarProduto){
        const resposta = await prismaClient.produto.findUnique({
            where:{
                id: id
            },
            select:{
                id: true
                
            }
        })
        return resposta
    }
}

export { ListarProdutoUnicoServices }