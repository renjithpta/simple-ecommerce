import express from 'express'
const router = express.Router()
import {
    addRule,
    getRules,
    updateRule,
    getRuleById,
} from '../controllers/ruleController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, addRule).get(protect, admin, getRules)
router
    .route('/:id')
    .put(protect, admin, updateRule)
    .get(protect, admin, getRuleById)
export default router
