import { loggerService } from '../../services/logger.service.js'
import { userService } from '../user/user.service.js'
import { gigService } from '../gig/gig.service.js'
import { authService } from '../auth/auth.service.js'
import { orderService } from './order.service.js'

export async function getOrders(req, res) {
    try {        
        console.log('yo', req.body)
        var { loggedinUser } = req
        // const orders = await orderService.query(req.body)
        const orders = await orderService.query(loggedinUser)
        res.send(orders)
    } catch (err) {
        loggerService.error('Cannot get orders', err)
        res.status(400).send({ err: 'Failed to get orders' })
    }
}
export async function getSellerOrders(req, res) {
    try {        
        console.log('yo', req.body)
        var { loggedinUser } = req
        loggedinUser.isSeller = true
        // const orders = await orderService.query(req.body)
        const orders = await orderService.query(loggedinUser)
        res.send(orders)
    } catch (err) {
        loggerService.error('Cannot get orders', err)
        res.status(400).send({ err: 'Failed to get orders' })
    }
}

export async function deleteOrder(req, res) {
    try {
        const deletedCount = await orderService.remove(req.params.id, req.loggedinUser)
        res.send({ order: 'Deleted successfully', deletedCount })
    } catch (err) {
        loggerService.error('Failed to delete order', err)
        res.status(400).send({ err })
    }
}


export async function addOrder(req, res) {

    var { loggedinUser } = req

    try {
        var order = req.body
        order.buyer = loggedinUser
        order = await orderService.add(order)

        // ** */ prepare the updated order for sending out**
        console.log(order)                    
        // User info is saved also in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)

        // delete order.seaboutBugId
        // delete order.byUserId
        // delete order.aboutBug.creator
        // delete order.aboutBug.description
        // delete order.aboutBug.lables
        // delete order.aboutBug.createdAt

        // delete order.byUser.imgUrl
      

        res.send(order)

    } catch (err) {
        loggerService.error('Failed to add order', err)
        res.status(400).send({ err: 'Failed to add order' })
    }
}

export async function updateOrder(req, res) {
    // const { _id, status } = req.body
    // const orderToSave = { _id, status }
    var order = req.body
    
    try {
        const savedOrder = await orderService.update(order)
        res.send(savedOrder)
    } catch (err) {
        res.status(400).send(`Couldn't update order ${err}`)
    }
}