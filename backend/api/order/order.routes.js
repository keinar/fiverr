import express from 'express'
import { requireAuth,requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/log.middleware.js'

import { addOrder, getOrders, deleteOrder,getSellerOrders ,updateOrder} from './order.controller.js'
const router = express.Router()

router.get('/', requireAuth, getOrders)
router.get('/seller', requireAuth, getSellerOrders)
router.post('/', log, requireAuth, addOrder)
router.put('/', log, requireAuth, updateOrder)
router.delete('/:id', requireAdmin, deleteOrder)

export const orderRoutes = router