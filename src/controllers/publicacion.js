import { response, request } from 'express'
import { Publicacion, Stock } from '../models'

async function Post(req = request, res = response){

    try {

        console.log('PUBLICACIÓN POST')
        let attrPublicacion = {
            stocks: req.body.stocks
        }
        let publicacion = new Publicacion(attrPublicacion)
        publicacion.save(
            (err) => {
                if (err) 
                res.json(err.message)
            }
        )
        res.send(publicacion)

    } catch (err) {
        
        res.status(500).json({
            err,
            msg:"Server dice: Error al crear la publicación"
        })

    }


}

async function GetAll(req = request, res = response){

    try {

        console.log('PUBLICACIÓN GET')
        let populateStock = {
            path: 'stocks',
            select: '_id',
            match: {},
            populate: {
                path: 'modelo',
                select: '_id name tags',
                match: {}
            }
        }
        let publicaciones = await Publicacion.find().populate(populateStock)
        res.send(publicaciones)

    } catch (err) {
        
        res.status(500).json({
            err,
            msg:"Server dice: Error al obtener las publicaciones"
        })

    }


}

async function GetById(req = request, res = response){

    try {

        console.log('PUBLICACIÓN GET: ' + req.params.id)
        let publicacion = await Publicacion.find({_id:req.params.id})
        res.send(publicacion)

    } catch (err) {
        
        res.status(500).json({
            err,
            msg:"Server dice: Error al obtener la publicación"
        })

    }

}

async function Delete(req = request, res = response){

    try {

        console.log('PUBLICACIÓN DELETE')
        let publicacion_eliminado = await Publicacion.deleteOne({_id:req.params.id})
        res.send(publicacion_eliminado)

    } catch (err) {
        
        res.status(500).json({
            err,
            msg:"Server dice: Error al deletear la publicación"
        })

    }


}

async function Put(req = request, res = response){

    try {

        console.log('PUBLICACIÓN PUT')
        let publicacion_modificado = await Publicacion.updateOne({_id:req.params.id}, req.body)
        res.send(publicacion_modificado)

    } catch (err) {
        
        res.status(500).json({
            err,
            msg:"Server dice: Error al actualizar la publicación"
        })

    }


}



async function GetStocksNoPublicados(req = request, res = response) {

    try {
        let reqQuery = req.query

        let publicaciones = JSON.parse(
            JSON.stringify(
                await Publicacion
                    .find()
                    .select('_id')
                    .populate({
                        path: 'stocks',
                        select: '_id',
                        match: {},
                        populate: {
                            path: 'modelo',
                            select: '_id',
                            match: {}
                        }
                    })
            ))
        let stocksPublicados = []
        publicaciones.forEach((publicacion) => {

            stocksPublicados.push(...publicacion.stocks)

        })

        let populateModelo = {
            path: 'modelo',
            select: '_id name tags',
            match: {}
        }
        
        if (reqQuery.modeloid != undefined || reqQuery.modeloid != '')
            populateModelo.match._id = reqQuery.modeloid
            
        let stocks = await Stock
            .find()
            .populate(populateModelo)

        let stocksSinPublicar = stocks.filter((stock) => {
            let noPublicado = !stocksPublicados.some(sp => sp._id == stock._id)
            
            let conModelo = (stock.modelo != undefined && stock.modelo != null)
            return (noPublicado && conModelo)
        })
        
        res.send({ stocksSinPublicar })

    } catch (err) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al obtener el stock"
        })

    }


}



export default {
    GetAll,
    GetById,
    Post,
    Delete,
    Put,
    GetStocksNoPublicados
}