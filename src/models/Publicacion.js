import { Schema } from 'mongoose'

const PublicacionSchema = new Schema({
    stocks:[{
        type: Schema.Types.ObjectId,
        ref: 'Stock'
    }]
})

export default PublicacionSchema