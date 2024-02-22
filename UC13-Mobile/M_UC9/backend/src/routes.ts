import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'


import { LoginController } from './Controller/Login/LoginController'
import { CriarusuariosController } from './Controller/Usuarios/CriarUsuariosController'
import { ListarUsuarioTokenController } from './Controller/Usuarios/listarUsuarioTokenController'

import { CriarMotoqueirosController } from './Controller/Motoqueiros/CriarMotoqueirosController'
import { ListarMotoqueirosTokenController } from './Controller/Motoqueiros/ListarMotoqueiroTokenController'
import { LoginMotoqueirosController } from './Controller/Motoqueiros/LoginMotoqueirosController'

import { CriarProdutosController } from './Controller/Produtos/CriarProdutosController'

import { CriarCategoriasController } from './Controller/Categorias/CriarCategoriasController'
import { ListarCategoriasController } from './Controller/Categorias/ListarCategoriasController'

import { CriarClienteController } from './Controller/Cliente/CriarClienteController'
import { ListarClienteTokenController } from './Controller/Cliente/ListarClienteTokenController'
import { LoginClienteController } from './Controller/Cliente/LoginClienteController'

import { isAutenticado } from './middleware/isAutenticado'
const router = Router()
const upload = multer(uploadConfig.upload('./tmp'))


//Rotas de Logins
router.post('/LoginUsuarios', new LoginController().handle)

//Rotas de Motoqueiros
router.post('/LoginMotoqueiros', new LoginMotoqueirosController().handle)
router.get('/ListarMotoqueirosToken', isAutenticado, new ListarMotoqueirosTokenController().handle)
router.post('/CriarMotoqueiros', new CriarMotoqueirosController().handle)

//Rotas de Motoqueiros
router.post('/CriarCliente', new CriarClienteController().handle)
router.post('/LoginCliente', new LoginClienteController().handle)
router.get('/ListarClienteToken', isAutenticado, new ListarClienteTokenController().handle)


//Estrutura de Usuários
router.post('/CriarUsuarios', new CriarusuariosController().handle)
router.get('/ListarUsuarioToken', isAutenticado, new ListarUsuarioTokenController().handle)

//Estrutura de Produtos
router.post('/CriarProdutos', isAutenticado, upload.single('file'), new CriarProdutosController().handle)

//Estrutura de Categorias
router.post('/CriarCategorias', isAutenticado, new CriarCategoriasController().handle)
router.get('/ListarCategorias', isAutenticado, new ListarCategoriasController().handle)


export { router }