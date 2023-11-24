import { Tag } from "@prisma/client";
import { prisma } from "../server"

const createNewTag = async (tag: Tag) : Promise<Tag> => {
    const title  = tag.title
    const newTag = await prisma.tag.create({
        data: {
            title
        }
    })

    return newTag
}

const getAllTags = async () : Promise<Tag[]> => {
    const tags = await prisma.tag.findMany({})

    return tags
}

const getTagById =async (tagId:number) : Promise<Tag> => {
    const tag = await prisma.tag.findUniqueOrThrow({
        where: {
            id: tagId
        }
    })

    return tag
}

const updateTag = async (tagId:number, tag:Tag) : Promise<Tag> => {
    const title = tag.title
    const newTag = await prisma.tag.update({
        where: {
            id: tagId
        },
        data: {
            title: title
        }
    })

    return newTag
}

const deleteTag = async (tagId:number) : Promise<void> => {
    await prisma.tag.delete({
        where: {
            id: tagId
        }
    })
}

export default {
    createNewTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag
}

