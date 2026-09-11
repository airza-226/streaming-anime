import {Router} from 'express'
import {register,login, refreshToken, logout} from '../controllers/auth.controller.ts'
import { validate } from '../middlewares/validate.middleware.ts'
import { loginSchema, registerSchema } from '../schemas/auth.schema.ts'
const router = Router()
router.post('/register',validate(registerSchema),register)
router.post('/login',validate(loginSchema),login)
router.post('/refresh-token',refreshToken)
router.post('/logout',logout)
export default router