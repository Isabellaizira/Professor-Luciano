import prismaClient from '../../prisma'

interface criarItem {
    quantidade: string
    valor: string
    pedidoId: string
    produtoId: string
}

class ItemPedidoServices {
    async criarItem({ quantidade, valor, pedidoId, produtoId}: criarItem){
     if (!quantidade || !valor || !pedidoId || !produtoId) {
        throw new Error('Existem Campos em Branco')
     }
     await prismaClient.itemPedido.create({
        data:{
            quantidade: quantidade,
            valor:valor,
            pedidoId:pedidoId,
            produtoId:produtoId
        }
     })
     return {dados: 'Cadastro Efetuado Com Sucesso'}
    }
}
export { ItemPedidoServices }