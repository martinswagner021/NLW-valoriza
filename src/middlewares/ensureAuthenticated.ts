import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    // Receber o token
    const authToken = req.headers.authorization

    // Validar preenchimento token
    if(!authToken) {
        return res.status(401).end()
    }
    
    // Validar token
    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, "4add635c15d59ffee8eadbdf0ae62baa")
        
        // Recuperar infos do usuario
        req.user_id = sub.toString()

    } catch (error) {
        res.status(401).end()
    }

    return next()

}