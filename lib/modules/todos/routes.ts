import { Application, Request, Response } from 'express';
import { TodoController } from './controllers/todo.controller';

export class TodoRoutes {
    private todoController = new TodoController();

    public route(app: Application) {
        app.get('/todo', (req: Request, res: Response) => {
            this.todoController.createNewTodo(req, res);
        });
    }
}
