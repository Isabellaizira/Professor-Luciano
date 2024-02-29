import prismaClient from '../../prisma'

interface ListarItem{
    id: string
}

class ListarItemUnicoServices{
    async execute({ id }: ListarItem){
        const resposta = await prismaClient.itens.findUnique({
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

export { ListarItemUnicoServices }