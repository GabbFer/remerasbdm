import mongoose from 'mongoose'
import svconfig from './config'

console.log(svconfig)
const conn = mongoose.createConnection( svconfig.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
conn.catch(() => {
    console.error('[!!] Ocurrió un error al conectarse a mongo:', config.MONGODB_URI )
})
.then(() => {
    console.info('[·] Se conectó correctamente a la base de datos', conn.name )
})

export default conn