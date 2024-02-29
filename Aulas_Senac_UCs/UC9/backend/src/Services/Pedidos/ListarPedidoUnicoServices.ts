import prismaClient from '../../prisma'

interface ListarPedido {
    id: string
}

class ListarPedidoUnicoServices {
    async execute({ id }: ListarPedido){
        const resposta = await prismaClient.pedido.findUnique({
            where:{
                id:id
            },
            select:{
                n_pedido:true,
                status:true
            }
        })
        return resposta
    }
}

export { ListarPedidoUnicoServices }