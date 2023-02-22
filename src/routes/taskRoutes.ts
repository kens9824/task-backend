import * as express from "express";
import {
  createTask, getAllTask, changeStatus
} from "../controllers/taskController";

let router = express.Router();

router.get("/", getAllTask);
router.post("/", createTask);
router.put("/:id", changeStatus);


export = router;
