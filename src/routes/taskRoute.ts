import express from "express";
import TaskController from "../controllers/TaskController";

const router = express.Router()

router.post("/", TaskController.createTask)
router.get("/", TaskController.getAll)
router.get("/:id", TaskController.getTask)
router.put("/:id", TaskController.updateTask)
router.delete("/:id", TaskController.deleteTask)

export default router