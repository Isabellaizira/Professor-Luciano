import { Request, Response } from 'express'
import { ListarItemUnicoServices } from '../../Services/Itens/ListarItemUnicoServices'

class ListarItemUnicoController{
    async handle(req: Request, res: Response){
        const id  = req.user_id
        const listarItemUnicoService = new ListarItemUnicoServices()
        const resposta = await listarItemUnicoService.execute({
            id
        })
        return res.json(resposta)
    }

}

export { ListarItemUnicoController }
