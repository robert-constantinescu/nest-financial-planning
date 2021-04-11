import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";


export interface Response<T> {
    body: T
    successful: boolean
}

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