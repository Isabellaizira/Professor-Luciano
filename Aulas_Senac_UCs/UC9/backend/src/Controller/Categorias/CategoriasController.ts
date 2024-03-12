import { Request, Response } from 'express'
import { CategoriasServices } from '../../Services/Categorias/CategoriasServices'


class CategoriasController {
    async criarCategoria(req: Request, res: Response) {
        const { nome } = req.body
        const criarCategoriasServices = new CategoriasServices()
        const resposta = await criarCategoriasServices.criarCategoria({
            nome
        })
        return res.json(resposta)
    }


    async listarCategoria(req: Request, res: Response) {
        const listarCategoriaServices = new CategoriasServices()
        const resposta = await listarCategoriaServices.listarCategoria()
        return res.json(resposta)
    }
}

export { CategoriasController }