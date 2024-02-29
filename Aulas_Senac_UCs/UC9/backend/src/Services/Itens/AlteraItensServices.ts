import prismaClient from '../../prisma'

interface AlterarItens{
    id: string
    alteraQuantidade: string
 
}

class AlterarItensServices{
    async execute({ id, alteraQuantidade }: AlterarItens){
        const data = new Date(Date.now())
        await prismaClient.itens.update({
            where:{
                id: id
            },
            data:{
                quantidade:alteraQuantidade,
                update_at: data
            }
        })
        return {dados: 'Dados Alterados com Sucesso'}
    }
}

export { AlterarItensServices }