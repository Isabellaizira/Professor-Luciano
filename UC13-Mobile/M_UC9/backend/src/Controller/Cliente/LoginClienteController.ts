import { Request, Response } from 'express'
import { LoginClienteServices } from '../../Services/Cliente/LoginClienteServices'

class LoginClienteController{
    async handle(req: Request, res: Response){
        const { email, password } = req.body

        const loginClienteServices = new LoginClienteServices()
        const resposta = await loginClienteServices.execute({
            email,
            password
        })
        return res.json(resposta)
    }
}

export { LoginClienteController }