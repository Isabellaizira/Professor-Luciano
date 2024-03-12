import prismaClient from '../../prisma'

interface IdCliente {
    id_cliente: string
}

class PedidosServices {
    async criarPedido({id_cliente}: IdCliente){
        const resposta = await prismaClient.pedido.create({
            data:{
                id_cliente
            },
            include:{
                clientes: true
            }
        })
        return resposta
    }
}

export { PedidosServices }