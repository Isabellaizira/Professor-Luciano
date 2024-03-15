import { Request, Response } from 'express'
import { ClienteServices } from '../../Services/Clientes/ClientesServices'

class ClientesController {
    async criarCliente(req: Request, res: Response) {
        const { nome, celular, cpf, email, password, cep, rua, numero, complemento, bairro, cidade, estado } = req.body
        const criarClienteServices = new ClienteServices()
        const resposta = await criarClienteServices.criarCliente({
            nome, celular, cpf, email, password, cep, rua, numero, complemento, bairro, cidade, estado
        })
        return res.json(resposta)
    }

    async listarClientes(req: Request, res: Response) {
        const listarClientes = new ClienteServices()
        const resposta = await listarClientes.listarClientes()
        return res.json(resposta)
    }

    async loginCliente(req: Request, res: Response) {
       const {email, password} = req.body
       const loginClienteServices = new ClienteServices()
       const resposta = await loginClienteServices.loginCliente({
        email, password
       })
       return res.json(resposta)
    }
}

export { ClientesController }