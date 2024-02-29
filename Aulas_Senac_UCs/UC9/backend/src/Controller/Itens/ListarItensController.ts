import { Request, Response } from 'express'
import { ListarItensServices } from '../../Services/Itens/ListarItensServices'


class ListarItensController {
    async handle(req: Request, res: Response) {
        const listarItensServices = new ListarItensServices()
        const itens = await listarItensServices.execute()
        return res.json(itens)
    }
}

export { ListarItensController }