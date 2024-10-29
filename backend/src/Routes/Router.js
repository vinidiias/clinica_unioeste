const { Router } = require('express')

const userController = require('../Controller/UserController')
const SessionController = require('../Controller/SessionController')
const PessoaController = require('../Controller/PessoaController')

const routes = Router()


routes.post('/user', userController.create)
routes.get('/user', userController.index)
routes.delete('/user/:user_id', userController.delete)

routes.post('/:user_id/pessoa', PessoaController.create)
routes.get('/list_pessoas', PessoaController.indexAll)
routes.get('/list_user/:user_id', PessoaController.indexByUser)
routes.patch('/pessoa/:id', PessoaController.updatePessoa)
routes.delete('/pessoa/delete', PessoaController.deleteAll)
routes.delete('/:user_id/pessoa/:pessoa_id', PessoaController.delete)

routes.post('/session', SessionController.create)

module.exports = routes