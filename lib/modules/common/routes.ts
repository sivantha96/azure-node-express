import { Application, Request, Response } from 'express';
import { ERROR_MESSAGES } from './constants/response-messages.constant';
import { notFoundErrorResponse } from './services/response.service';
import { Upload } from './middleware/file-upload.middleware';
import { CommonController } from './controllers/common.controller';

const FileUploader = Upload().single('file');
export class CommonRoutes {
    private commonController = new CommonController();

    public route(app: Application) {
        app.get('/', (req: Request, res: Response) => {
            res.send(`Hello from ${process.env.EXPRESS_APP_NAME}`);
        });

        app.all('*', (req, res) => {
            notFoundErrorResponse(res, undefined, ERROR_MESSAGES.INVALID_URL);
        });

        // upload files
        app.post('/files', FileUploader, (req: Request, res: Response) => {
            this.commonController.uploadFiles(req, res);
        });

        // get file
        app.get('/files/:file_name', (req: Request, res: Response) => {
            this.commonController.getFile(req, res);
        });

        // delete file
        app.delete('/files/:file_name', (req: Request, res: Response) => {
            this.commonController.deleteFile(req, res);
        });
    }
}
