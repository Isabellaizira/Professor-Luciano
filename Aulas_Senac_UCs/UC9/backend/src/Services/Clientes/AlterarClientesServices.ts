import prismaClient from '../../prisma'

interface AlterarClientes {
    id: string
    alteraNome: string
}

class AlterarClientesServices {
    async execute({id, alteraNome}: AlterarClientes) {
        const data = new Date(Date.now())
        await prismaClient.cliente.update({
            where: {
                id:id
            },
            data:{
                nome: alteraNome,
                update_at:data
            }
        })
        return { dados: 'Dados Alterados com Sucesso'}
    }
}

export { AlterarClientesServices }