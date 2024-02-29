import { Request, Response } from 'express'
import { ListarProdutoUnicoServices } from '../../Services/Produtos/ListarProdutoUnicoServices'

class ListarProdutoUnicoController{
    async handle(req: Request, res: Response){
        const id  = req.user_id
        const listarProdutoUnicoService = new ListarProdutoUnicoServices()
        const resposta = await listarProdutoUnicoService.execute({
            id
        })
        return res.json(resposta)
    }

}

export { ListarProdutoUnicoController }