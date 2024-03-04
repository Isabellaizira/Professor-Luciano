import { Request,Response } from 'express'
import { AlterarPedidoServices } from '../../Services/Pedidos/AlterarPedidoServices'

class AlterarPedidoController {
    async handle(req: Request, res: Response) {
        const { id, alteraStatus } = req.body
        const alterarPedidoServices = new AlterarPedidoServices()
        const resposta = await alterarPedidoServices.execute({
            id,
            alteraStatus
        })
        return res.json(resposta)
    }
}

export { AlterarPedidoController }