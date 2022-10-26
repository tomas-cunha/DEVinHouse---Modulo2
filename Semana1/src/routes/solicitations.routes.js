import {Router} from 'express'
import { create, destroy, findMany, findOne } from '../controllers/solicitation.controller.js'

const solicitationsRoutes = Router()

solicitationsRoutes.get('/solicitations', findMany)

solicitationsRoutes.post('/solicitations', create)

solicitationsRoutes.get('/solicitations/:cpf', findOne)

solicitationsRoutes.delete('/solicitations/:id', destroy)

export default solicitationsRoutes