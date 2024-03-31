import express from 'express'
import { addGig, getGig, getGigs, removeGig, updateGig } from './gig.controller.js'
import { log } from '../../middlewares/log.middleware.js'
import {requireAuth} from '../../middlewares/requireAuth.middleware.js'
const router = express.Router()

router.get('/', getGigs)
router.get('/:gigId', getGig)
router.delete('/:gigId', removeGig)
router.post('/', addGig)
router.put('/', updateGig)

// router.get('/', getGigs)
// router.get('/:gigId',requireAuth, getGig)
// router.delete('/:gigId',log, requireAuth, removeGig)
// router.post('/', requireAuth, addGig)
// router.put('/',requireAuth, updateGig)

export const gigRoutes = router