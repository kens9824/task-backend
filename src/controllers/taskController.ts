import { Request, Response } from "express";
import { RequestFailed } from "../response/RequestFailedResponse";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { Task } from "../entity/Task";



export const createTask = async (req: Request, res: Response) => {
  try {

    const validateObject = (input: object) => {
      const schema = Joi.object().keys({
        taskName: Joi.string().required(),
        taskAssign: Joi.string().required(),
      });
      return schema.validate(input);
    };

    const result = validateObject(req.body)


    if (result?.error?.details) {
      return RequestFailed(res, 400, result.error.details[0].message);
    }
    else {

      const taskName: string = req.body.taskName || "";
      const taskAssign: string = req.body.taskAssign;

      const timestamp = req.body.timestamp
        ? new Date(req.body.timestamp)
        : new Date();


      const task = new Task();
      task.taskName = taskName;
      task.taskAssign = taskAssign;
      task.timestamp = timestamp


      await task.save();

      res.status(200).json({
        success: true,
        data: task
      });

    }

  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAllTask = async (_: Request, res: Response) => {
  try {
    const alltask = await Task.find();

    var todo: any = []
    var done: any = []
    var doing: any = []

    alltask.forEach((item: any) => {
      switch (item.status) {
        case "Done":
          done.push(item)
          break;
        case "Todo":
          todo.push(item)
          break;
        case "Doing":
          doing.push(item)
          break;
      }
    });

    var data = {
      todo: todo,
      done: done,
      doing: doing,
      totalTask : alltask.length
    }

    if (alltask) {
      res.status(200).json({
        success: true,
        data: data

      });
    }

  } catch (error) {
    return InternalServerError(res, error);
  }
};


export const changeStatus = async (req: Request, res: Response) => {
  try {

    const { status } = req.body
    const taskId = req.params.id

    if (!status) {
      return RequestFailed(res, 400, "status");
    }
    const task = await Task.findOne(taskId)

    task.status = status
    task.last_updated = new Date()
    await task.save()

    if (task) {
      res.status(200).json({
        success: true,
        message: "task update succusfully",
        data: task
      });
    }

  } catch (error) {
    return InternalServerError(res, error);
  }
};

