import prismaClient from '../../prisma'

interface ListarCliente {
    id: string
}

class ListarUnicoClienteServices{
    async execute({id}: ListarCliente){
        const resposta = await prismaClient.cliente.findUnique({
            where:{
                id:id
            },
            select:{
                id: true,
                nome: true,
                celular:true,
                cep:true
            }
        })
        return resposta
    }
}

export { ListarUnicoClienteServices}