import fs from 'fs'
import { dbService } from '../../services/db.service.js';
import { ObjectId } from 'mongodb'


import { loggerService } from '../../services/logger.service.js'
export const gigService = {
    query,
    add,
    update,
    getById,
    remove
}

const collectionName = 'gig'
const PAGE_SIZE = 4

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const sortBy = _buildSortBy(filterBy)        
        const collection = await dbService.getCollection(collectionName)
        const gigCursor = await collection.find(criteria).sort(sortBy)

        if (filterBy.pageIdx !== undefined) {            
            const startIdx = filterBy.pageIdx * PAGE_SIZE
            gigCursor.skip(startIdx).limit(PAGE_SIZE)
        }
    
        const gigs = await gigCursor.toArray()

        return gigs
    } catch (err) {
        loggerService.error(`Had problems getting gigs...`)
        throw err
    }
}

async function getById(gigId, loggedinUser) {
    try {
        console.log('Whereeee', gigId)
        console.log('log',loggedinUser)
        const collection = await dbService.getCollection(collectionName)
        

        const gig = await collection.findOne({ _id: new ObjectId(gigId) })
        
        if (!gig) throw `Couldn't find gig with _id ${gigId}`
        console.log('here1')
        // if (!loggedinUser?.isAdmin && gig.creator._id !== loggedinUser?._id) throw `Not your gig`
        return gig
    } catch (err) {
        loggerService.error(`Had problems getting gig ${gigId}...`)
        throw err
    }
}

async function remove(gigId, loggedinUser) {
    try {
        // const idx = gigs.findIndex(gig => gig._id === gigId)
        // const gig = gigs[idx]
        // if (!loggedinUser?.isAdmin && gig.creator._id !== loggedinUser?._id) throw `Not your gig`
        // gigs.splice(idx, 1)
        // _savegigsToFile('./data/gig.json')
        const collection = await dbService.getCollection(collectionName)
        const { deletedCount } = await collection.deleteOne({ _id: new ObjectId(gigId) })
        // return deletedCount
    } catch (err) {
        loggerService.error(`Had problems removing gig ${gigId}...`)
        throw err
    }

    return `gig ${gigId} removed`
}
async function add(gigToSave, loggedinUser) {
    try {
        console.log(loggedinUser)
        gigToSave.creator ={_id: new ObjectId(loggedinUser._id), fullname: loggedinUser.fullname}
        gigToSave.createdAt = Date.now()        
        // gigToSave.creator = loggedinUser
        const collection = await dbService.getCollection(collectionName)
        await collection.insertOne(gigToSave)
        return gigToSave
    } catch (err) {
        loggerService.error('gigService, can not add gig : ' + err)
        throw err
    }
}

async function update(gig, loggedinUser) {
    try {
        // Peek only updateable fields
        const gigToSave = {
            title: gig.title,
            severity: gig.severity,
            description: gig.description
        }
        const collection = await dbService.getCollection(collectionName)        
        const originGig = await collection.findOne({ _id: new ObjectId(gig._id) })        
        if (!originGig) throw `Couldn't find gig with _id ${gig._id}`

        if (!loggedinUser?.isAdmin && new ObjectId(originGig.creator._id).toString() !== loggedinUser?._id) throw `Not your gig`
        const res = await collection.updateOne({ _id: new ObjectId(gig._id) }, { $set: gigToSave })
        console.log('res', res)
        if(res.modifiedCount < 1) throw 'Could not update gig'
        return gig
    } catch (err) {
        loggerService.error(`cannot update gig ${gig._id}`, err)
        throw err
    }
}


function _makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}
function _readJsonFile(path) {
    const str = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(str)
    return json
}

function _saveGigsToFile(path) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gigs, null, 2)
        fs.writeFile(path, data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.title) {
        criteria.title = { $regex: filterBy.title, $options: 'i' }
    }
    if (filterBy.severity) {
        criteria.severity = { $gt: filterBy.severity }
        
    }   
    if (filterBy.userId){  
        console.log('hi', filterBy.userId)
        // if (filterBy.byUserId) criteria.byUserId = new ObjectId(filterBy.byUserId)
        // criteria['creator._id'] = filterBy.userId;    
        criteria['creator._id'] = new ObjectId(filterBy.userId)
        console.log(criteria)
    }  
    return criteria
}


function _buildSortBy(filterBy) {
    let sortBy = {}
    let sortOrder = 1;
    if (filterBy.sortDir){
        sortOrder = filterBy.sortDir
    }
    if (filterBy.sortBy) {
        if (filterBy.sortBy === 'title') {
            sortBy = { 'title': sortOrder }
        }
        else if (filterBy.sortBy === 'severity') {
            sortBy = { 'severity': sortOrder }
        }
        else if (filterBy.sortBy === 'createdAt') {
            sortBy = { 'createdAt': sortOrder }
        }
    }
    return sortBy
}