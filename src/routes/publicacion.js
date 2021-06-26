import Router from 'express'
import PublicacionController from '../controllers/publicacion'

const router = Router()

router.delete('/:id', PublicacionController.Delete )

router.get('/', PublicacionController.GetAll )
router.get('/:id', PublicacionController.GetById )

router.post('/', PublicacionController.Post )

router.put('/:id', PublicacionController.Put )

router.get('/helper/GetStocksNoPublicados', PublicacionController.GetStocksNoPublicados )

export default router