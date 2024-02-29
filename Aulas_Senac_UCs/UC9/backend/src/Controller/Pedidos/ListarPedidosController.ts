import { Request, Response } from 'express'
import { ListarPedidosServices } from '../../Services/Pedidos/ListarPedidosServices'


class ListarPedidosController {
    async handle(req: Request, res: Response) {
        const listarPedidosServices = new ListarPedidosServices()
        const pedido = await listarPedidosServices.execute()
        return res.json(pedido)
    }
}

export { ListarPedidosController }