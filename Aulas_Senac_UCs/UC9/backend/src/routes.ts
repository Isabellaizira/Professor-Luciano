import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'

//Criar
import { CriarPedidosController } from './Controller/Pedidos/CriarPedidosController'
import { CriarItensController } from './Controller/Itens/CriarItensController'
import { CriarClientesController } from './Controller/Clientes/CriarClientesController'
import { CriarusuariosController } from './Controller/Usuarios/CriarUsuariosController'
import { CriarProdutosController } from './Controller/Produtos/CriarProdutosController'
import { CriarCategoriasController } from './Controller/Categorias/CriarCategoriasController'
import { CriarMotoqueirosController } from './Controller/Motoqueiros/CriarMotoqueirosController'

//Login
import { LoginController } from './Controller/Login/LoginController'
import { LoginMotoqueirosController } from './Controller/Motoqueiros/LoginMotoqueirosController'
import { LoginClientesController } from './Controller/Clientes/LoginClientesController'

//Listar
import { ListarUsuarioTokenController } from './Controller/Usuarios/listarUsuarioTokenController'
import { ListarMotoqueirosTokenController } from './Controller/Motoqueiros/ListarMotoqueiroTokenController'
import { ListarCategoriasController } from './Controller/Categorias/ListarCategoriasController'
import { ListarClientesController } from './Controller/Clientes/ListarClientesController'
import { ListarPedidosController } from './Controller/Pedidos/ListarPedidosController'
import { ListarProdutosController } from './Controller/Produtos/ListarProdutosController'
import { ListarItensController } from './Controller/Itens/ListarItensController'

//Listar Unico
import { ListarUnicoClienteController } from './Controller/Clientes/ListarUnicoClienteController'
import { ListarPedidoUnicoController } from './Controller/Pedidos/ListarPedidoUnicoController'
import { ListarItemUnicoController } from './Controller/Itens/ListarItemController'
import { ListarProdutoUnicoController } from './Controller/Produtos/ListarProdutoUnicoController'

//Alterar
import { AlterarClientesController } from './Controller/Clientes/AlterarClientesController'
import { AlterarItensController } from './Controller/Itens/AlteraItensController'
import { AlterarPedidoController } from './Controller/Pedidos/AlterarPedidoController'
import { AlterarProdutosController } from './Controller/Produtos/AlterarProdutosController'


import { isAutenticado } from './middleware/isAutenticado'

const router = Router()
const upload = multer(uploadConfig.upload('./tmp'))


//Rotas de Criar
router.post('/CriarMotoqueiros', new CriarMotoqueirosController().handle)
router.post('/CriarClientes', new CriarClientesController().handle)
router.post('/CriarUsuarios', new CriarusuariosController().handle)
router.post('/CriarProdutos', upload.single('file'), new CriarProdutosController().handle)
router.post('/CriarCategorias', new CriarCategoriasController().handle)
router.post('/CriarPedido', new CriarPedidosController().handle)
router.post('/CriarItens', new CriarItensController().handle)

//Login
router.post('/LoginUsuarios', new LoginController().handle)
router.post('/LoginMotoqueiros', new LoginMotoqueirosController().handle)
router.post('/LoginClientes', new LoginClientesController(). handle)

//Rota de Listar
router.get('/ListarMotoqueirosToken', isAutenticado, new ListarMotoqueirosTokenController().handle)
router.get('/ListarUsuarioToken', isAutenticado, new ListarUsuarioTokenController().handle)
router.get('/ListarCategorias', isAutenticado, new ListarCategoriasController().handle)
router.get('/ListarClientes', new ListarClientesController().handle)
router.get('/ListarPedidos', new ListarPedidosController().handle)
router.get('/ListarProdutos', new ListarProdutosController().handle)
router.get('/Listaritens', new ListarItensController().handle)

//Listar Unico
router.get('/Listar1Cliente', isAutenticado, new ListarUnicoClienteController().handle)
router.get('/Listar1Pedido', isAutenticado, new ListarPedidoUnicoController().handle)
router.get('/Listar1Item', isAutenticado, new ListarItemUnicoController().handle)
router.get('/Listar1Produto', isAutenticado, new ListarProdutoUnicoController().handle)

//Alterar
router.put('AlterarCliente', new AlterarClientesController().handle)
router.put('/AlterarItem', new AlterarItensController().handle)
router.put('/AlterarPedido', new AlterarPedidoController().handle)
router.put('/AlterarProduto', new AlterarProdutosController().handle)


export { router }