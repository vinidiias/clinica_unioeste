const { Router } = require('express')

const userController = require('../Controller/UserController')
const SessionController = require('../Controller/SessionController')
const PessoaController = require('../Controller/PessoaController')
const FichaController = require('../Controller/FichaController')
const InvaitedController = require('../Controller/InvaitedController')

const routes = Router()

//Usuarios
routes.post('/user', (req, res, next) => {
    req.body.role = 'paciente'
    next()
}, userController.create)
routes.get('/user', userController.index)
routes.patch('/user/:user_id', userController.updateUser)
routes.delete('/:user_id/user', userController.delete)

//Pessoas
routes.post('/:user_id/pessoa', PessoaController.create)
routes.get('/pessoas', PessoaController.indexAll)
routes.get('/:user_id/pessoa', PessoaController.indexByUser)
routes.patch('/pessoa/:user_id', PessoaController.updatePessoa)
routes.delete('/pessoas/delete', PessoaController.deleteAll)
routes.delete('/:user_id/pessoa/:pessoa_id', PessoaController.delete)

//Fichas
routes.post('/:user_id/ficha', FichaController.create)
routes.get('/ficharios', FichaController.indexAll)
routes.get('/:user_id/ficha/:ficha_id', FichaController.indexByUser)
routes.delete('/user_id/ficha/ficha_id', FichaController.delete)
routes.delete('/ficharios/delete', FichaController.deleteAll)

//Sessao
routes.post('/session', SessionController.create)

//Psicologo
routes.post('/convite', InvaitedController.invited)
routes.post('/validate', InvaitedController.validated)
routes.post('/register', InvaitedController.register)

module.exports = routes