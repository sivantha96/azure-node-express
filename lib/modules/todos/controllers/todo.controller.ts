import { Request, Response } from 'express';
import * as responses from '../../common/services/response.service';
import Todo from '../models/todo.model';

export class TodoController {
    public async createNewTodo(req: Request, res: Response) {
        const todo = {
            name: 'test-todo' + Date.now(),
        };
        try {
            await Todo.create(todo);
            return responses.successResponse(res);
        } catch (error) {
            responses.internalServerErrorResponse(res, error);
        }
    }
}
