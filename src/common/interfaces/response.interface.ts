export interface Response<T> {
    body?: T;
    successful: boolean;
    statusCode: number;
    message: string;
}
