import prismaClient from '../../prisma'

interface CriarPedidos {
    n_pedido: string
    status: string
    clienteId: string
    usuarioId: string
    motoqueiroId: string
}

class CriarPedidosServices {
    async execute({ n_pedido, status, clienteId, usuarioId, motoqueiroId }: CriarPedidos) {
        if (!n_pedido || !status || !clienteId || !usuarioId || !motoqueiroId) {
            throw new Error('Existem campos em branco')
        }
        await prismaClient.pedido.create({
            data: {
                n_pedido: n_pedido,
                status: status,
                clienteId: clienteId,
                usuarioId: usuarioId,
                motoqueiroId: motoqueiroId
            }
        })
        return {dados: 'Cadastro efetuado com sucesso'}
    }
}

export { CriarPedidosServices }