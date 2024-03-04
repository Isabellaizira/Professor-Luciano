import { Request, Response } from 'express'
import { AlterarClientesServices } from '../../Services/Clientes/AlterarClientesServices'

class AlterarClientesController {
    async handle(req: Request, res: Response) {
      const { id, alteraNome } = req.body
      const alterarClientesServices = new AlterarClientesServices()
      const resposta = await alterarClientesServices.execute({
        id,
        alteraNome
      })
      return res.json(resposta)
    }
}

export { AlterarClientesController }