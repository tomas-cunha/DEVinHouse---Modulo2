import {Router} from 'express'
import { create, findMany } from '../controllers/pizza.controller.ts'

const pizzaRoutes = Router()

pizzaRoutes.get('/pizzas', findMany)
pizzaRoutes.post('/pizzas', create)

export default pizzaRoutes