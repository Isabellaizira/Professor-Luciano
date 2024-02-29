import prismaClient from '../../prisma'

class ListarClientesServices {
    async execute(){
        const clientes = await prismaClient.cliente.findMany({})
        return (clientes)
    }
}

export { ListarClientesServices }