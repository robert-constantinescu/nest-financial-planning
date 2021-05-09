import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";
import {Response} from "../interfaces/response.interface";



@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): Response<any> {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception.getStatus();
        const excResponse = exception.getResponse();

        return response.status(status).json({
            successful: response.successful,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: excResponse
        });
    }
}