import { Tag, Task } from "@prisma/client"
import { Request } from "express"

const getIdFromRequest = (req: Request) : number => {
    return Number(req.params.id)
}

const getTagBodyFromRequest = (req:Request) : Tag => {
    return req.body
}

const getTaskBodyFromRequest = (req:Request) : Task => {
    return req.body
}

export default {
    getIdFromRequest,
    getTagBodyFromRequest,
    getTaskBodyFromRequest
}