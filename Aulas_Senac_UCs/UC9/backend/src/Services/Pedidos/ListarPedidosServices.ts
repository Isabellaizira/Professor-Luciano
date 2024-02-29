import prismaClient from '../../prisma'

class ListarPedidosServices {
    async execute(){
        const pedido = await prismaClient.pedido.findMany({})
        return (pedido)
    }
}

export { ListarPedidosServices}