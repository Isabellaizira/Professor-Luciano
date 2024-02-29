import { Request, Response } from 'express'
import { ListarUnicoClienteServices } from '../../Services/Clientes/ListarUnicoClienteServices'


class ListarUnicoClienteController{
async handle(req:Request, res: Response) {
    const  id  = req.user_id
    const listarUnicoClienteServices = new ListarUnicoClienteServices()
    const resposta = await listarUnicoClienteServices.execute({
        id
    })
    return res.json(resposta)
}
}

export { ListarUnicoClienteController}