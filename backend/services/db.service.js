import mongoDB from 'mongodb'

const { MongoClient } = mongoDB

// import { config } from '../config/index.js'
import { loggerService } from './logger.service.js'
import { config } from '../config/index.js'

export const dbService = {
    getCollection
}

// Connection URL
// const url = (false && process.env.NODE_ENV === 'production') ?
//     'mongodb+srv://theDbUser:camay2019@cluster0-klgzh.mongodb.net/test?retryWrites=true&w=majority' :
//     'mongodb://localhost:27017'

// const url = 'mongodb+srv://yuvaln:5TyBim79Veptc3cS@cluster0.omxjkhj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// Database Name
// const dbName = 'missBug_db'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        loggerService.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
         const client = await MongoClient.connect(config.dbURL)
        //const client = await MongoClient.connect(url)
        // const db = client.db(config.dbName)
        const db = client.db(config.dbName)
        dbConn = db
        return db
    } catch (err) {
        loggerService.error('Cannot Connect to DB', err)
        throw err
    }
}