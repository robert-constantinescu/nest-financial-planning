import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Response} from "../interfaces/response.interface";


@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const response = context.switchToHttp().getResponse();
        return next.handle()
            .pipe(
                map(
                    body =>
                        ({
                            successful: true,
                            body
                        })
                    )
                );
    }



}