import * as multer from 'multer';
import { Request } from 'express';

export const MIME_TYPES = {
    image: '(image/jpeg)|(image/png)',
    pdf: '(text/pdf)|(application/pdf)',
    doc: '(application/vnd.openxmlformats-officedocument.wordprocessingml.document)',
    excel: '(application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)',
    eml: '(application/octet-stream)',
    csv: '(text/csv)|(application/vnd.ms-excel)',
};

const defaultOptions = {
    filters: [],
    fileSize: 20,
    withOriginalName: false,
};

export const Upload = (options = defaultOptions) => {
    const multerFilter = (req: Request, file: Express.Multer.File, callback: (error: Error | null, valid?: boolean) => void) => {
        const filterMimeTypes = (options.filters || []).map((filter) => MIME_TYPES[filter]);
        if (filterMimeTypes.some((mimeType) => file.mimetype.match(mimeType))) {
            callback(null, true);
        } else {
            callback(new Error('File format is not allowed'));
        }
    };

    const multerStorage = multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, callback: Function) => {
            callback(null, process.env.EXPRESS_FILE_UPLOAD_PATH);
        },
        filename: (req: Request, file: Express.Multer.File, callback: Function) => {
            if (options.withOriginalName) {
                callback(null, file.originalname);
            } else {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const nameParts = file.originalname?.split('.');
                const namePartsLen = nameParts.length;
                const extension = namePartsLen > 1 && nameParts[namePartsLen - 1];
                const fileName = uniqueName + '.' + extension;
                callback(null, fileName);
            }
        },
    });

    const fileSize = options.fileSize * 1024 * 1024;

    return multer({
        fileFilter: options.filters?.length > 0 ? multerFilter : undefined,
        storage: multerStorage,
        limits: { fileSize },
    });
};
