import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'

//Criar
import { PedidosController } from './Controller/Pedidos/PedidosController'
import { CategoriasController } from './Controller/Categorias/CategoriasController'
import { ClientesController } from './Controller/Clientes/ClientesController'
import { MotoqueirosController } from './Controller/Motoqueiros/MotoqueiroController'




import { CriarusuariosController } from './Controller/Usuarios/CriarUsuariosController'
import { CriarProdutosController } from './Controller/Produtos/CriarProdutosController'


//Login
import { LoginController } from './Controller/Login/LoginController'



//Listar
import { ListarUsuarioTokenController } from './Controller/Usuarios/listarUsuarioTokenController'


import { ListarProdutosController } from './Controller/Produtos/ListarProdutosController'

//Listar Unico



import { ListarProdutoUnicoController } from './Controller/Produtos/ListarProdutoUnicoController'

//Alterar


import { AlterarProdutosController } from './Controller/Produtos/AlterarProdutosController'


import { isAutenticado } from './middleware/isAutenticado'

const router = Router()
const upload = multer(uploadConfig.upload('./tmp'))


//Pedido
router.post('/CriarPedido', new PedidosController().criarPedidos)


//Categoria
router.post('/CriarCategoria', new CategoriasController().criarCategoria)
router.get('/ListarCategoria', new CategoriasController().listarCategoria)

//Cliente
router.post('/CriarCliente', new ClientesController().criarCliente)
router.post('/LoginCliente', new ClientesController().loginCliente) 

//Motoqueiro
router.post('/CriarMotoqueiro', new MotoqueirosController().criarMotoqueiro)
router.get('/ListarToken', new MotoqueirosController().motoToken)
router.post('/LoginMoto', new MotoqueirosController().MotoLogin)



router.post('/CriarUsuarios', new CriarusuariosController().handle)
router.post('/CriarProdutos', upload.single('file'), new CriarProdutosController().handle)




//Login
router.post('/LoginUsuarios', new LoginController().handle)



//Rota de Listar

router.get('/ListarUsuarioToken', isAutenticado, new ListarUsuarioTokenController().handle)



router.get('/ListarProdutos', new ListarProdutosController().handle)

//Listar Unico



router.get('/Listar1Produto', isAutenticado, new ListarProdutoUnicoController().handle)

//Alterar


router.put('/AlterarProduto', new AlterarProdutosController().handle)


export { router }