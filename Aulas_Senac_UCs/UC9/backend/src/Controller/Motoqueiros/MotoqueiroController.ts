import { Request, Response } from 'express'
import { MotoqueirosServices } from '../../Services/Motoqueiros/MotoqueiroServices'


class MotoqueirosController {
    async criarMoto(req: Request, res: Response) {
        const { nome, nusuarios, password } = req.body
        const criarMotoqueiroServices = new MotoqueirosServices()
        const resposta = await criarMotoqueiroServices.criarMotoqueiro({
            nome, nusuarios, password
        })
        return res.json(resposta)
    }

    async motoToken(req: Request, res: Response) {
        const id = req.user_id
        const listarMotoqueiroServices = new MotoqueirosServices()
        const resposta = await listarMotoqueiroServices.ListarToken({
            id
        })
        return res.json(resposta)
    }

    async MotoLogin(req: Request, res: Response) {
        const { nusuario, password } = req.body

        const loginMotoqueirosServices = new MotoqueirosServices()
        const resposta = await loginMotoqueirosServices.loginMoto({
            nusuario,
            password
        })
        return res.json(resposta)
    }
}

export { MotoqueirosController }