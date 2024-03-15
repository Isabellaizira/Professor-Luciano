import { Request, Response } from 'express'
import { ItemPedidoServices } from '../../Services/ItemPedido/ItemPedidoServices'


class ItemPedidoController {
    async criarItem(req: Request, res: Response) {
        const { quantidade, valor, pedidoId, produtoId } = req.body

        const criarItemServices = new ItemPedidoServices()
        const resposta = await criarItemServices.criarItem({
            quantidade,
            valor,
            pedidoId,
            produtoId
        })
        return res.json(resposta)
    }
}

export { ItemPedidoController }