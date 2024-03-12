import { Request, Response } from 'express'
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
}

export { PedidosController }