import express from 'express'
import cors from 'cors'

import allRoutes from './routes/'

const app = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json({ limit: "15mb" }))
app.use(function (error, req, res, next){

    //https://stackoverflow.com/questions/15819337/catch-express-bodyparser-error
    if (error.message == "request entity too large"){
        return res.status(500).json({
            msg:"El request pudo haber sido muy pesado paaadre"
        })
    }
    
    next()
    
})

app.use('/api/', allRoutes)

app.set('port',process.env.APP_PORT || 8080)
export default app