import { Schema } from 'mongoose'

const StockSchema = new Schema({
 
    temporada: {
        type: String,
        default: "Verano"
    },
    talle: {
        type: String,
        default: 'M',
        enum: ['SM', 'S', 'M', 'L', 'XL', 'XXL']
    },
    color: {
        type: String,
        default: "#000000"
    },
    modelo:{
        type: Schema.Types.ObjectId,
        ref: 'Modelo',
        required: [true, 'Es necesario que el stock tenga una Remera']
    },

    //?#######################################################

    cantidad_disponible:{
        type: Number,
        required: [true, 'La cantidad a vender es necesario']
    },
    precio_unitario:{
        type: Number,
        required: [true, 'El precio es necesario']
    },
    descuento_unitario:{
        type: Number
    }
    
    
})


export default StockSchema
