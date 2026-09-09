import { ZodError, ZodTypeAny } from "zod";
import {Request,Response, NextFunction} from "express"
import { AppError } from "../utils/appError";
export const validate = (schema:ZodTypeAny) => async(req:Request, res:Response, next:NextFunction) => {
    try {
        await schema.parseAsync({
            body:req.body,
            query:req.query,
            params:req.params
        })
        return next()
    } catch (error) {
        if(error instanceof ZodError) {
            const errorMessage = error.issues.map((err) => err.message).join(', ');
            return next(new AppError(errorMessage,400))
        }
    }
}