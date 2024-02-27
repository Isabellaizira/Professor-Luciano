import { Request, Response } from 'express'
import { CriarItensServices } from '../Services/Itens/CriarItensServices'


class CriarItensController {
    async handle(req: Request, res: Response) {
        const { quantidade, valorUnico, valorTotal, pedidoId, produtoId } = req.body

        const criarItensServices = new CriarItensServices()
        const resposta = await criarItensServices.execute({
            quantidade,
            valorUnico,
            valorTotal,
            pedidoId,
            produtoId,
        })
        return res.json(resposta)
    }
}

export { CriarItensController }