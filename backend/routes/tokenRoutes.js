import express from 'express'
const router = express.Router()
import {
    customerTokenDetails,getTxDetails
} from '../controllers/tokenContoller.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/customer-details').get(protect, customerTokenDetails)
router.route('/customer-tx-details').get(protect, getTxDetails)

export default router
