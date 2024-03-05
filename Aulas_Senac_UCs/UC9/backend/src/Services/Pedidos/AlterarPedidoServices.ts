import prismaClient from '../../prisma'

interface AlterarPedido{
    id:string
    alteraStatus: string
}

class AlterarPedidoServices {
    async execute({ id, alteraStatus }: AlterarPedido){
         await prismaClient.pedido.update({
            where:{
                id:id
            },
            data:{
                status:alteraStatus
            }
         })
         return {dados: 'Dados Alterados com Sucesso'}
    }
}

export { AlterarPedidoServices }