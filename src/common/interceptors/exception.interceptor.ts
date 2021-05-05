import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";
import {Response} from "../interfaces/response.interface";



@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): Response<any> {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        return response.status(status).json({
            statusCode: status,
            successful: response.successful,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: (exception as HttpException).message
        });
    }
}