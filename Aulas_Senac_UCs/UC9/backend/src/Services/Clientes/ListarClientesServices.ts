import prismaClient from '../../prisma'

class ListarClientesServices {
    async execute(){
        const clientes = await prismaClient.cliente.findMany({
            //orderby serve para ordenar, asc é crescente e desc descrecente.
            orderBy: {
                nome:'asc'
            }
        })
        return (clientes)
    }
}

export { ListarClientesServices }