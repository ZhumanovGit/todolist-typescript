import { Request, Response } from "express"
import TagService from "../services/TagService"
import Util from "../Util"

const createTag = async (req: Request, res: Response) => {
    try {
        const tagId = Util.getIdFromRequest(req)
        const tag = Util.getTagBodyFromRequest(req)
        const newTag = await TagService.createTag(tagId, tag)
        res.status(200).json(newTag)
    } catch (e) {
        console.error(e)
        res.status(500).json({error: e})
    }
}

const getTag = async (req: Request, res: Response) => {
    try {
        const tagId = Util.getIdFromRequest(req)
        const tag = await TagService.getTag(tagId)
        res.status(200).json(tag)
    } catch (e) {
        console.error(e)
        res.status(404).json({error: e})
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const tags = await TagService.getAllTags()
        res.status(200).json(tags)
    } catch (e) {
        console.error(e)
        res.status(500).json({error: e})
    }
}

const updateTag = async (req: Request, res: Response) => {
    try {
        const tagId = Util.getIdFromRequest(req)
        const tag = Util.getTagBodyFromRequest(req)
        const updatedTag = await TagService.updateTag(tagId, tag)
        res.status(200).json(updatedTag)
    } catch (e) {
        console.error(e)
        res.status(400).json({error: e})
    }
}

const deleteTag = async (req: Request, res: Response) => {
    try {
        const tagId = Util.getIdFromRequest(req)
        await TagService.deleteTagById(tagId)
        res.status(200).json('success')
    } catch (e) {
        console.error(e)
        res.status(404).json({error: e})
    }
}

export default {
    createTag,
    getTag,
    getAll,
    updateTag,
    deleteTag
}