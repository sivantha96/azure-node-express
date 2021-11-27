import { Request, Response } from 'express';
import * as fs from 'fs';
import * as responses from '../services/response.service';

export class CommonController {
    // upload files
    public async uploadFiles(req: Request, res: Response) {
        if (req.file) {
            try {
                responses.successResponse(res, { file: req.file.filename });
            } catch (error) {
                responses.internalServerErrorResponse(res, error);
            }
        } else {
            responses.unProcessableEntityErrorResponse(res);
        }
    }

    // get files
    public getFile(req: Request, res: Response) {
        const file_parts = req.params.file_name.split('.');
        if (file_parts.length > 1) {
            const file_path = `${process.env.EXPRESS_FILE_UPLOAD_PATH}/${req.params.file_name}`;
            fs.readFile(file_path, (err: Error, data: any) => {
                if (err) {
                    responses.notFoundErrorResponse(res, err);
                } else {
                    // Don't change this to successResponse(data, res);
                    res.send(data);
                }
            });
        } else {
            responses.insufficientParametersErrorResponse(res);
        }
    }

    // delete file
    public deleteFile(req: Request, res: Response) {
        const file_parts = req.params.file_name.split('.');
        if (file_parts.length > 1) {
            const file_path = `${process.env.EXPRESS_FILE_UPLOAD_PATH}/${req.params.file_name}`;
            fs.unlink(file_path, (err: Error) => {
                if (err) {
                    responses.successWithErrorResponse(res, 1006);
                } else {
                    responses.successResponse(res);
                }
            });
        } else {
            responses.insufficientParametersErrorResponse(res);
        }
    }
}
