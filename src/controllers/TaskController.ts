import {Request, Response } from "express"
import TaskService from "../services/TaskService"
import  Util from '../Util'

const createTask = async (req: Request, res: Response) => {
    try {
        const taskId = Util.getIdFromRequest(req)
        const task = Util.getTaskBodyFromRequest(req)
        const newTask = await TaskService.createTask(taskId, task)
        res.status(200).json(newTask)
    } catch (e) {
        console.error(e)
        res.status(500).json({error: e})
    }
}

const getTask = async (req: Request, res: Response) => {
    try {
        const taskId = Util.getIdFromRequest(req)
        const task = await TaskService.getTaskById(taskId)
        res.status(200).json(task)
    } catch (e) {
        console.error(e)
        res.status(404).json({error: e})
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskService.getAll()
        res.status(200).json(tasks)
    } catch (e) {
        console.error(e)
        res.status(500).json({error: e})
    }
}

const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = Util.getIdFromRequest(req)
        const task = Util.getTaskBodyFromRequest(req)
        const updatedTask = await TaskService.updateTask(taskId, task)
        res.status(200).json(updatedTask)
    } catch (e) {
        console.error(e)
        res.status(400).json({error: e})
    }
}

const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = Util.getIdFromRequest(req)
        await TaskService.deleteTaskById(taskId)
        res.status(200).json('success')
    } catch (e) {
        console.error(e)
        res.status(404).json({error: e})
    }
}

export default {
    createTask,
    getAll,
    getTask,
    updateTask,
    deleteTask
}