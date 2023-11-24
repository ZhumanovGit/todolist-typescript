import { Task } from "@prisma/client";
import TaskRepository from "../repositories/TaskRepository"
import TagRepository from "../repositories/TagRepository";

const createTask = async (id:number, task: Task) : Promise<Task> => {
    if (!isTaskValid(task)) {
        throw new Error('Task is not valid')
    }

    console.log('work')

    if (task.tagId !== undefined) {
        try{
            await TagRepository.getTagById(task.tagId)
        } catch (e) {
            throw new Error('this tag is not found')
        }
    }

    return await TaskRepository.createNewTask(task)
}

const getAll = async () : Promise<Task[]> => {
    return await TaskRepository.getAllTasks()
}

const getTaskById = async (id:number) : Promise<Task> => {
    if (!isTaskExists(id)) {
        throw new Error('Task is not found')
    }

    return await TaskRepository.getTaskById(id)
}

const updateTask = async (id:number, task: Task) : Promise<Task> => {
    if (!isTaskValid(task)) {
        throw new Error('Task is not valid')
    }

    if (!isTaskExists(id)) {
        throw new Error('Task is not found')
    }

    if (task.tagId !== undefined) {
        try {
            await TagRepository.getTagById(id)
        } catch (e) {
            throw new Error('Tag is not found')
        }    
    }

    return await TaskRepository.updateTask(id, task)
}

const deleteTaskById = async (id:number) => {
    if (!isTaskExists(id)) {
        throw new Error('Task is not found')
    }

    await TaskRepository.deleteTask(id)
}

function isTaskValid(task:Task) : boolean {
    return task.title !== undefined && task.title !== null
}

async function isTaskExists(id:number) : Promise<boolean> {
    try {
        const needTask = await TaskRepository.getTaskById(id)
        console.log(needTask)
        return needTask !== undefined
    } catch (e) {
        console.log('was exception')
        return false
    }
}

export default {
    createTask,
    getAll,
    getTaskById,
    updateTask,
    deleteTaskById
}