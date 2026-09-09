import {Router} from 'express'
import {register,login} from '../controllers/auth.controller.ts'
import { validate } from '../middlewares/validate.middleware.ts'
import { loginSchema, registerSchema } from '../schemas/auth.schema.ts'
const router = Router()
router.post('/register',validate(registerSchema),register)
router.post('/login',validate(loginSchema),login)
export default router