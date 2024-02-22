import { Request, Response } from 'express'
import { CriarClienteServices } from '../../Services/Cliente/CriarClienteServices'

class CriarClienteController {
    async handle(req: Request, res: Response) {
        const { nome,
            telefone,
            cpf_cnpj,
            rg_ie,
            cep,
            rua,
            bairro,
            nCasa,
            cidade,
            estado,
            email,
            password
        } = req.body
        const criarClienteServices = new CriarClienteServices()
        const resposta = await criarClienteServices.execute({
            nome,
            telefone,
            cpf_cnpj,
            rg_ie,
            cep,
            rua,
            bairro,
            nCasa,
            cidade,
            estado,
            email,
            password
        })
        return res.json(resposta)
    }
}

export { CriarClienteController }