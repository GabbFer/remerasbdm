import conn from '../database'
import ModeloSchema from './Modelo.js'
import StockSchema from './Stock.js'
import PublicacionSchema from './Publicacion.js'

const Modelo = conn.model("Modelo",ModeloSchema)
const Stock = conn.model("Stock",StockSchema)
const Publicacion = conn.model("Publicacion",PublicacionSchema)

export {
    Modelo,
    Stock,
    Publicacion
}