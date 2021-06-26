import { Schema } from 'mongoose'

const ModeloSchema = new Schema({
    tags:[{ type: String }],
    name:{
        type: String,
        required: [true, 'El nombre de la Modelo es obligatorio']
    },
    img:{
        type: String,
        required: [true, 'La imagen de la Modelo es obligatoria']
    }
},
{
    versionKey: false
})

export default ModeloSchema