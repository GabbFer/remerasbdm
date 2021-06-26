import Router from 'express'
import ModeloController from '../controllers/modelo'

const router = Router()

router.get('/helper/cmbmodelos', ModeloController.CmbModelos)

router.delete('/:id', ModeloController.Delete)

router.get('/', ModeloController.GetAll)
router.get('/:id', ModeloController.GetById)

router.post('/', ModeloController.Post)

router.put('/:id', ModeloController.Put)


export default router