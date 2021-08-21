import { response, request } from 'express'
import { Stock } from '../models'

async function Post(req = request, res = response) {

    try {

        console.log('STOCK POST')
        let attrStock = {
            temporada: req.body.temporada,
            talle: req.body.talle,
            color: req.body.color,
            modelo: req.body.modelo,
            cantidad_disponible: req.body.cantidad_disponible,
            precio_unitario: req.body.precio_unitario,
            descuento_unitario: req.body.descuento_unitario,
        }
        let stock = new Stock(attrStock)
        await stock.save(
            (err) => {
                if (err)
                    res.status(500).json({
                        err,
                        msg: "Server dice: Error al crear el stock"
                    })
            }
        )

        res.send(stock)

    } catch (err) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al crear el stock"
        })

    }

}

async function GetAll(req = request, res = response) {

    try {

        console.log('STOCK GET')
        let stocks = await Stock.find()
        res.send(stocks)

    } catch (err) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al obtener los stocks"
        })

    }


}

async function GetById(req = request, res = response) {

    try {

        console.log('STOCK GET')
        let stock = await Stock.find({ _id: req.params.id })
        res.send(stock)

    } catch (err) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al obtener el stock"
        })

    }


}

async function Delete(req = request, res = response) {

    try {

        console.log('STOCK GET: ' + req.params.id)
        let stock_eliminado = await Stock.deleteOne({ _id: req.params.id })
        res.send({msg:"Stock delete finalizado",stock_eliminado})

    } catch (err) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al deletear el stock"
        })

    }


}

async function Put(req = request, res = response) {

    try {

        console.log('STOCK PUT')
        let stock_modificado = await Stock.updateOne({ _id: req.params.id }, req.body)
        res.send(stock_modificado)

    } catch (err) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al actualizar el stock"
        })

    }

}

async function Dashboard(req = request, res = response) {

    try {

        console.log('STOCK GET')
        let stocks = await Stock.find().populate('modelo','_id name tags')
        res.send(stocks)

    } catch (err) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al obtener los stocks"
        })

    }


}


export default {
    GetAll,
    GetById,
    Post,
    Delete,
    Put,
    Dashboard
}