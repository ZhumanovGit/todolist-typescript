import { Task } from "@prisma/client";
import { prisma } from "../server"


const createNewTask = async (task: Task) : Promise<Task> => {
    const { title, description, isDone, tagId} = task
    if (isIncludeTag(task)) {
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                isDone,
                tag: {
                    connect: {id: tagId}
                }
            },
            include: {
                tag: true
            }
        })

        return newTask
    }
    
    const newTask = await prisma.task.create({
        data: {
            title,
            description,
            isDone
        }
    })

    return newTask
}

const getAllTasks = async () : Promise<Task[]> => {
    const tasks = await prisma.task.findMany({
        include: {
            tag: true
        }
    })

    return tasks
}

const getTaskById = async (taskId:number) : Promise<Task> => {
    const needTask = await prisma.task.findUniqueOrThrow({
        where: {
            id: taskId
        }
    })

    return needTask
}

const updateTask = async (taskId:number, task:Task) : Promise<Task> => {
    const { title, description, isDone, tagId } = task
    if (isIncludeTag(task)) {
        const newTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                title: title,
                description: description,
                isDone: isDone,
                tag: {
                    connect: {id: tagId}
                }
    
            },
            include: {
                tag: true
            }
        })
    
        return newTask
    }
    const newTask = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            title: title,
            description: description,
            isDone: isDone,
        },
    })

    return newTask
}

const deleteTask = async (taskId:number) : Promise<void> => {
    await prisma.task.delete({
        where: {
            id: taskId
        }
    })
}

function isIncludeTag(task: Task) : boolean {
    return task.tagId !== undefined && task.tagId !== null
}


export default {
    createNewTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}
