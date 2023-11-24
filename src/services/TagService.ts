import { Tag } from "@prisma/client"

import  TagRepository  from "../repositories/TagRepository"

const createTag = async (id:number, tag:Tag) : Promise<Tag> => {
    
    if (!isTagValid(tag)) {
        throw new Error('Tag is not valid')
    }

    return await TagRepository.createNewTag(tag)
    
}

const getTag = async (id:number) : Promise<Tag> => {
    if (!isTagExists(id)) {
        throw new Error('Tag is not found')
    }

    return await TagRepository.getTagById(id)
}

const getAllTags = async () : Promise<Tag[]> => {
    return await TagRepository.getAllTags()
}

const updateTag = async (id:number, tag:Tag) : Promise<Tag> => {
    if (!isTagValid(tag)) {
        throw new Error('tag is not valid')
    }

    if (!isTagExists(id)) {
        throw new Error('tag with this id is not exists')
    }

    return await TagRepository.updateTag(id, tag)
}

const deleteTagById = async (id:number) => {
    if (!isTagExists(id)) {
        throw new Error('tag with this id is not exists')
    }

    await TagRepository.deleteTag(id)
}

function isTagValid(tag:Tag) : boolean {
    return tag.title !== undefined && tag.title !== null
}

async function isTagExists(id:number) : Promise<boolean> {
    try {
        const needTag = await TagRepository.getTagById(id)
        return needTag !== null && needTag !== undefined
    } catch (e) {
        return false
    }
}

export default {
    createTag,
    getTag,
    getAllTags,
    updateTag,
    deleteTagById
}