export default class HttpException extends Error {
    status: number;
    message: string;
    data: object;
    type?: string;

    constructor(status: number, message: string, data?: object) {
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
