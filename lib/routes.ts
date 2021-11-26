import { Application } from 'express';

import { CommonRoutes } from './modules/common/routes';
import { TodoRoutes } from './modules/todos/routes';

export default (app: Application) => {
    const commonRoutes = new CommonRoutes();
    const todoRoutes = new TodoRoutes();

    todoRoutes.route(app);
    commonRoutes.route(app);
};
