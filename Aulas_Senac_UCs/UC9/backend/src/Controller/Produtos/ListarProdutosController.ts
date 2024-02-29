import { Request, Response } from 'express'
import { ListarProdutosServices } from '../../Services/Produtos/ListarProdutosServices'


class ListarProdutosController {
    async handle(req: Request, res: Response){
  const listarProdutosServices = new ListarProdutosServices()
  const produtos = await listarProdutosServices.execute()
  return res.json(produtos)
    }
}

export { ListarProdutosController }