import asyncHandler from 'express-async-handler'
import Rule from '../models/ruleModel.js'
import { newRule } from '../utils/tokenUtil.js'
// @desc    Register a new rule
// @route   POST /api/rules
// @access  Public
const addRule = asyncHandler(async (req, res) => {
    const { category, amount, tokenRate } = req.body

    let ruleNumber = await Rule.countDocuments({}).exec();
    ruleNumber = ruleNumber + 1;
    
    await newRule(amount, tokenRate);

    const rule = await Rule.create({
        ruleNumber,
        category,
        amount,
        tokenRate,
    })

    if (rule) {
        res.status(201).json({
            _id: rule._id,
            ruleNumber: rule.ruleNumber,
            category: rule.category,
            amount: rule.amount,
            tokenRate: rule.tokenRate,
        })
    } else {
        res.status(400)
        throw new Error('Invalid rule data')
    }
})
// @desc    Get all rules
// @route   GET /api/rules
// @access  Private/Admin
const getRules = asyncHandler(async (req, res) => {
    const rules = await Rule.find({})
    res.json(rules)
})
// @desc    Update rule
// @route   PUT /api/rules/:id
// @access  Private
const updateRule = asyncHandler(async (req, res) => {
    const rule = await Rule.findById(req.params.id)

    if (rule) {

        rule.category = req.body.category || rule.category
        rule.amount = req.body.amount || rule.amount
        rule.tokenRate = req.body.tokenRate || rule.tokenRate
        const updatedRule = await rule.save()
        res.json({
            _id: updatedRule._id,
            category: updatedRule.category,
            amount: updatedRule.amount,
            tokenRate: updatedRule.tokenRate,
        })

    } else {
        res.status(404)
        throw new Error('Rule not found')
    }
})



// @desc    Get Rule by ID
// @route   GET /api/rule/:id
// @access  Private/Admin
const getRuleById = asyncHandler(async (req, res) => {
    const rule = await Rule.findById(req.params.id)

    if (rule) {
        res.json(rule)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


export {

    addRule,
    getRules,
    updateRule,
    getRuleById,

}
