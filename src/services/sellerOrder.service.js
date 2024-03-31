
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})
const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/order/seller' :
    '//localhost:3031/api/order/seller'
const STORAGE_KEY = 'order'

export const sellerOrderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    addOrderMsg
}
window.cs = sellerOrderService


async function query() {
    // return httpService.get(STORAGE_KEY, filterBy)
    var { data: orders } = await axios.get(BASE_URL) 
    return orders
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}
async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put(`order/${order._id}`, order)

    } else {
        savedOrder = await httpService.post('order', order)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    const savedMsg = await httpService.post(`order/${orderId}/msg`, {txt})
    return savedMsg
}


function getEmptyOrder() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





