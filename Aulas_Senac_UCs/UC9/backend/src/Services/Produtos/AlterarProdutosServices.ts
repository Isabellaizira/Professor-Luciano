import prismaClient from '../../prisma'

interface AlterarProdutos {
    id: string
    nome:string
    fabricante:string
    quantidade:string
    preco:string
    banner:string
}

class AlterarProdutosServices {
    async execute({ id, nome, fabricante, quantidade, preco, banner }: AlterarProdutos){
        const data = new Date(Date.now())
        await prismaClient.produto.update({
            where:{
                id:id
            },
            data:{
                nome:nome,
                fabricante:fabricante,
                quantidade:quantidade,
                preco:preco,
                banner:banner,
                update_at:data
            }
        })
        return {dados: 'Dados alterados com sucesso'}
    }
}

export { AlterarProdutosServices }