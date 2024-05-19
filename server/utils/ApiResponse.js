// Here we are sending the response in a systematic manner on the response part to the user.
class ApiResponse {
    constructor(
        statusCode,
        data,
        message = "Success"
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };
