import { Request, Response } from 'express'
import { CriarPedidosServices } from '../../Services/Pedidos/CriarPedidosServices'


class CriarPedidosController{
    async handle(req: Request, res:Response){
        const{ n_pedido, status, clienteId,	usuarioId,motoqueiroId } = req.body
    
     const criarPedidosServices = new CriarPedidosServices()
     const resposta = await criarPedidosServices.execute({
        n_pedido,
        status,
        clienteId,
        usuarioId,
        motoqueiroId
     })
     return res.json(resposta)
    }
}

export  { CriarPedidosController}