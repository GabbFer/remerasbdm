import { Router } from 'express'
const router = Router()

import modeloRouter from './modelo'
import stockRouter from './stock'
import publicacionRouter from './publicacion'

router.use('/modelo', modeloRouter)
router.use('/stock', stockRouter)
router.use('/publicacion', publicacionRouter)

export default router