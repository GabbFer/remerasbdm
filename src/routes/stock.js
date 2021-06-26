import Router from 'express'
import StockController from '../controllers/stock'

const router = Router()

router.delete('/:id', StockController.Delete )

router.get('/', StockController.GetAll )
router.get('/:id', StockController.GetById )

router.post('/', StockController.Post )

router.put('/:id', StockController.Put )

export default router