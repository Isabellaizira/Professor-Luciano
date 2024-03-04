import { Request, Response } from 'express'
import { AlterarProdutosServices } from '../../Services/Produtos/AlterarProdutosServices'

class AlterarProdutosController {
    async handle(req: Request, res: Response) {
        const { id, nome, fabricante, quantidade, preco, banner } = req.body
        const alterarProdutosServices = new AlterarProdutosServices()
        const resposta = await alterarProdutosServices.execute({
            id,
            nome,
            fabricante,
            quantidade,
            preco,
            banner
        })
    return res.json(resposta)

    }
}

export { AlterarProdutosController }