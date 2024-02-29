import prismaClient from '../../prisma'

class ListarItensServices {
    async execute(){
        const itens = await prismaClient.itens.findMany({})
        return (itens)
    }
}

export { ListarItensServices}