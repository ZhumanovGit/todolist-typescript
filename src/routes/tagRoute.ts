import express from "express"
import TagController from "../controllers/tagController"

const router = express.Router()

router.post("/", TagController.createTag)
router.get("/", TagController.getAll)
router.get("/:id", TagController.getTag)
router.put("/:id", TagController.updateTag)
router.delete("/:id", TagController.deleteTag)

export default router
