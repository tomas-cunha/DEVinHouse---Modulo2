import {Router} from 'express'
import { create, destroy, findMany, findOne, updateStatus } from '../controllers/solicitation.controller'

const solicitationsRoutes = Router()

solicitationsRoutes.get('/solicitations', findMany)

solicitationsRoutes.post('/solicitations', create)

solicitationsRoutes.get('/solicitations/:cpf', findOne)

solicitationsRoutes.delete('/solicitations/:id', destroy)

solicitationsRoutes.patch('/solicitations/:cpf/status', updateStatus)

export default solicitationsRoutes