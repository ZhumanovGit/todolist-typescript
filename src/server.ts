import { Request, Response } from "express"
import express, {} from "express"
import { PrismaClient } from "@prisma/client"
import TagRouter from "./routes/tagRoute"
import TaskRouter from "./routes/taskRoute"

export const prisma = new PrismaClient()

const app = express()
const port = 8080;

async function main() {
    app.use(express.json())

    app.use("/tags", TagRouter)
    app.use("/tasks", TaskRouter)

    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found` })
    })

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
}

main()
    .then(async () => {
        await prisma.$connect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })