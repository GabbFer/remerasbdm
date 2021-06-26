import { response, request } from 'express'
import { Modelo } from '../models'

async function Post(req = request, res = response) {

    try {

        console.log('MODELO POST')
        let attrModelo = {
            tags: req.body.tags,
            name: req.body.name,
            img: req.body.img
        }
        let modelo = new Modelo(attrModelo)
        await modelo.save(
            (err) => {
                if (err)
                    res.json(err.message)
            }
        )
        res.send(modelo)

    } catch (error) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al crear modelo"
        })

    }

}

async function GetAll(req = request, res = response) {

    try {

        console.log('MODELO GET')
        let modelos = await Modelo.find()
        res.json(modelos)

    } catch (error) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al obtener los modelos"
        })

    }

}

async function GetById(req = request, res = response) {

    try {

        console.log('MODELO GET ID: ' + req.params.id)
        let modelo = await Modelo.findOne({ _id: req.params.id })
        if (modelo == null) {
            res.status(400).send("El _Id del modelo especificado no se ha encontrado")
        }
        res.json(modelo)

    } catch (error) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al obtener el modelo"
        })

    }

}

async function Delete(req = request, res = response) {

    try {

        console.log('MODELO DELETE')
        let modelo_eliminado = await Modelo.findOneAndDelete({ _id: req.params.id })
        if (modelo_eliminado == null) {
            res.status(400).send("El _Id del modelo especificado no se ha encontrado")
        }
        res.json(modelo_eliminado)

    } catch (error) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al deletear el modelo"
        })

    }

}

async function Put(req = request, res = response) {

    try {

        console.log('MODELO PUT')
        let modelo_modificado = await Modelo.findOneAndUpdate({ _id: req.params.id }, req.body)
        if (modelo_modificado == null) {
            res.status(400).send("El _Id del modelo especificado no se ha encontrado")
        }
        res.send(modelo_modificado)

    } catch (error) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al actualizar modelo"
        })

    }

}


async function CmbModelos(req = request, res = response) {

    try {

        console.log('MODELO GET')
        let modelos = await Modelo.find()
        let selectModelos = modelos.map((modelo)=>{
            return {modelo_id: modelo._id,name:modelo.name}
        })
        res.json({ modelos:selectModelos })

    } catch (error) {

        res.status(500).json({
            err,
            msg: "Server dice: Error al obtener los modelos"
        })

    }

}

export default {
    GetAll,
    GetById,
    Post,
    Delete,
    Put,
    CmbModelos
}