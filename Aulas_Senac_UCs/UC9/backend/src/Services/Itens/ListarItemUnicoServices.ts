import prismaClient from '../../prisma'

interface ListarItem {
    id: string
}

class ListarItemUnicoServices {
    async execute({ id }: ListarItem) {
        const resposta = await prismaClient.itens.findMany({
            where: {
                pedidoId: id
            },
            include: {
                produtos: true,
                pedido:true

            }
        })
        return resposta
    }
}

export { ListarItemUnicoServices }