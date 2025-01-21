import { Router } from 'express'
import ErrorsController from '~/controllers/errors.controller'

const router = Router()

router.get('/404', ErrorsController.get404)
router.get('/500', ErrorsController.get500)

export default router
