
import { Request, Response } from 'express'
import { AlterarItensServices } from '../../Services/Itens/AlteraItensServices'


class AlterarItensController{
    async handle(req: Request, res: Response ){
        const { id, alteraQuantidade } = req.body
        const alterarItensService = new AlterarItensServices()
        const resposta = await alterarItensService.execute({
            id,
            alteraQuantidade,
            
        })
        return res.json(resposta)
    }
}

export { AlterarItensController }