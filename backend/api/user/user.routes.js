import express from 'express'
import { getUser, getUsers, deleteUser, updateUser, addUser, getByUser} from './user.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/byname/:userName',getByUser)
router.post('/',addUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export const userRoutes = router