import mongoose from 'mongoose'


const txSchema = mongoose.Schema(
    {

        email: {
            type: String,
            required: true
        },
        transactionHash: {
            type: String,
            required: true,
        },
        blockHash: {
            type: String,
            required: true,
        },
        totalItemsPrice: {
            type: Number,
            required: true,
            default: 0,
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Order',
        },
    },
    {
        timestamps: true,
    }
)

const TxDetails = mongoose.model('TokenTx', txSchema)

export default TxDetails
