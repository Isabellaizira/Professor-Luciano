import prismaClient from '../../prisma'

interface CriarItens {
    quantidade: string
    valorUnico: string
    valorTotal: string
    pedidoId: string
    produtoId: string
}

class CriarItensServices {
    async execute({ quantidade, valorUnico, valorTotal, pedidoId, produtoId }: CriarItens) {
        if(!quantidade || !valorUnico || !valorTotal || !pedidoId || !produtoId){
            throw new Error('Existem campos em branco')
        }
        await prismaClient.itens.create({
            data:{
                quantidade: quantidade,
                valorUnico:valorUnico,
                valorTotal:valorTotal,
                pedidoId:pedidoId,
                produtoId:produtoId
            }
        })
        return{ dados: 'Cadastro efetuado com sucesso'}
    }

}

export { CriarItensServices }