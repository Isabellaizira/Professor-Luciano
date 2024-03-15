import { ListarProdutoUnicoController } from '../../Controller/Produtos/ListarProdutoUnicoController'
import prismaClient from '../../prisma'

interface IdCliente {
    id_cliente: string
}

interface produto {
    id: string
}
interface CriarItensPedido {
    id_pedido: string
    id_produto: string
    quantidade: number
    valor: number
}

class PedidosServices {
    async criarPedido({ id_cliente }: IdCliente) {
        const resposta = await prismaClient.pedido.create({
            data: {
                id_cliente
            },
            include: {
                clientes: true
            }
        })
        return resposta
    }

    async listarProdutosCategoria({ id }: produto) {
        const resposta = await prismaClient.produto.findMany({
            where: {
                categoriaId: id
            }
        })
        return resposta
    }

    async criarItemPedido({ id_pedido, id_produto, quantidade, valor }: CriarItensPedido) {
        const itemExiste = await prismaClient.itemPedido.findFirst({
            where: {
                AND: [
                    {
                        id_produto: id_produto,
                    },
                    {
                        id_pedido: id_pedido,
                    }
                ]
            }
        })
        if (itemExiste) {
            throw new Error('Item já adicionado')
        }
        const resposta = await prismaClient.itemPedido.create({
            data: {
                id_pedido: id_pedido,
                id_produto: id_produto,
                quantidade: quantidade,
                valor: valor
            },
            include: {
                produtos: true
            }
        })
        return resposta
    }

    async apagarItemPedido({ id }: produto) {
        await prismaClient.itemPedido.delete({
            where: {
                id: id
            }
        })
        return { dados: 'Item deletado' }
    }

    async somarItens({ id }: produto) {
        const resposta = await prismaClient.itemPedido.aggregate({
            where: {
                id_pedido: id
            },
            _sum: {
                valor: true
            }
        })
        return (resposta._sum.valor)
    }
}

export { PedidosServices }