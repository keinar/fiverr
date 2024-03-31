import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const collectionName = 'order'
async function query(filterBy = {}) {
    try {
        console.log('query_start', filterBy)
        const criteria = _buildCriteria(filterBy)
        // const pipeline = _buildPipeline(filterBy)
        console.log('criteria',criteria)
        const collection = await dbService.getCollection('order')
        
         const orders = await collection.find(criteria).toArray()
        // var orders = await collection.aggregate([{
        //     $match: criteria
        // },
        // {
        //     $lookup: {
        //         from: 'user',
        //         localField: 'byUserId',
        //         foreignField: '_id',
        //         as: 'byUser'
        //     }
        //  },
        // {
        //     $unwind: '$byUser'
        // },
        // {
        //     $lookup: {
        //         localField: 'aboutBugId',
        //         from: 'bug',
        //         foreignField: '_id',
        //         as: 'aboutBug'
        //     }
        // },
        // {
        //     $unwind: '$aboutBug'
        // },
        // {
        //     $project: {
        //         _id: true, // Include the '_id' field
        //         txt: true, // Include the 'txt' field
        //         "byUser._id": true, // Include 'byUser._id'
        //         "byUser.fullname": true, // Include 'byUser.fullname'
        //         "aboutBug._id": true, // Include 'aboutBug._id'
        //         "aboutBug.title": true, // Include 'aboutBug.title'
        //         "aboutBug.severity": true // Include 'aboutBug.severity'
        //     }
        // }
        // ]).toArray()
        // orders = orders.map(order => {
        //     order.byUser = { _id: order.byUser._id, fullname: order.byUser.fullname }
        //     order.aboutUser = { _id: order.aboutUser._id, fullname: order.aboutUser.fullname }
        //     delete order.byUserId
        //     delete order.aboutUserId
        //     return order
        // })

        return orders
    } catch (err) {
        loggerService.error('cannot find orders', err)
        throw err
    }

}

async function remove(orderId, loggedinUser) {
    try {
        const collection = await dbService.getCollection('order')

        // getById
        // remove only if user is owner/admin
        const criteria = { _id: new ObjectId(orderId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = new ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        if (deletedCount < 1) {
            throw 'Cannot remove order, not yours'
        }
        return deletedCount
    } catch (err) {
        loggerService.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}


async function add(order) {
    try {
        // const orderToAdd = {
        //     aboutBugId: new ObjectId(order.aboutBugId),
        //     byUserId: new ObjectId(order.byUserId),            
        //     txt: order.txt
        // }
        const collection = await dbService.getCollection(collectionName)
        await collection.insertOne(order)
        // return orderToAdd
        return order
    } catch (err) {
        loggerService.error('cannot insert order', err)
        throw err
    }
}

async function update(order) {
    try {        
        // Peek only updateable fields
        const orderToSave = {
            status: order.status            
        }
        const collection = await dbService.getCollection(collectionName);
        
        const originOrder = await collection.findOne({ _id: new ObjectId(order._id) });
        if (!originOrder) throw `Couldn't find order with _id ${order._id}`;
        
        const res = await collection.updateOne({ _id: new ObjectId(order._id) }, { $set: orderToSave });
        if(res.modifiedCount < 1) throw 'Could not update order'
     
        // Return the updated order
        return order;
    } catch (err) {
        loggerService.error(`Cannot update order ${order._id}`, err);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    console.log('buildcriteria', filterBy._id)
    if (filterBy.isSeller) {
        if (filterBy._id) {
            console.log('In criteria', criteria)
            criteria['seller._id'] = filterBy._id
        }
    } else {
        if (filterBy._id) {
            console.log('In criteria', criteria)
            criteria['buyer._id'] = filterBy._id
        }
    }
    
    // if (filterBy.buyer._id) criteria.buyer = {_id : new ObjectId(filterBy.buyer._id)}
    // if (filterBy.buyer?._id) {
    //     criteria['buyer._id'] = filterBy.buyer._id; 
    // }
    // if (filterBy.byUserId) criteria.byUserId = new ObjectId(filterBy.byUserId)
    // if (filterBy.byUserId) criteria['byUserId'] = filterBy.byUserId; 
    // if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    console.log('endcriteria',criteria)
    return criteria
}

export const orderService = {
    query,
    remove,
    add,
    update
}