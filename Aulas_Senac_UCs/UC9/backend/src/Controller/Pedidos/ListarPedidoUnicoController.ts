import { Request, Response } from 'express'
import { ListarPedidoUnicoServices } from '../../Services/Pedidos/ListarPedidoUnicoServices'


class ListarPedidoUnicoController {
    async handle(req: Request, res: Response) {
        const id = req.user_id
        const listarPedidoUnicoServices = new ListarPedidoUnicoServices()
        const resposta = await listarPedidoUnicoServices.execute({
            id
        })
        return res.json(resposta)
    }
}

export { ListarPedidoUnicoController }