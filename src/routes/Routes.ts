import * as express from "express";
import taskRouter from "./taskRoutes";

let router = express.Router();

router.use("/task", taskRouter);


export = router;