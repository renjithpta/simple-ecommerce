import mongoose from 'mongoose'

const ruleSchema = mongoose.Schema(
    {

        ruleNumber: {

            type: Number,
            required: true,

        },

        category: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            default: 0,
        },
        tokenRate: {
            type: Number,
            required: true,
            default: 0,
        },

    },
    {
        timestamps: true,
    }
)

const Rule = mongoose.model('Rules', ruleSchema)

export default Rule
