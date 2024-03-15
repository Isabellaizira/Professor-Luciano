import { request, Request, Response } from 'express'
import { PedidosServices } from '../../Services/Pedidos/PedidosServices'

class PedidosController {
    async criarPedidos(req: Request, res: Response) {
        const { id_cliente } = req.body
        const criarPedidosServices = new PedidosServices()
        const resposta = await criarPedidosServices.criarPedido({
            id_cliente
        })
        return res.json(resposta)
    }

    async listarProdutosCategoria(req: Request, res: Response) {
        const { id } = req.params
        const listarProdutosCategoria = new PedidosServices()
        const resposta = await listarProdutosCategoria.listarProdutosCategoria({
            id
        })
        return res.json(resposta)
    }

    async criarItensPedido(req: Request, res:Response) {
       const { id_pedido, id_produto, quantidade, valor } = req.body
       const criarItensPedido = new PedidosServices()
       const resposta = await criarItensPedido.criarItemPedido({
        id_pedido, id_produto, quantidade, valor
       })
       return res.json(resposta)
    }

    async apagarItemPedido(req: Request, res: Response) {
        const { id } = req.params
        const apagarItemPedidoServices = new PedidosServices()
        const resposta = await apagarItemPedidoServices.apagarItemPedido({
            id
        })
        return res.json(resposta)
    }

    async somarItens(req: Request, res: Response) {
        const { id } = req.params
        const SomarItensPedido = new PedidosServices()
        const resposta = await SomarItensPedido.somarItens({
            id
        })
        return res.json(resposta)
    }
}

export { PedidosController }