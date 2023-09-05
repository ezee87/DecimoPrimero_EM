const HttpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
};

const ErrorMessage =  {
    SUCCESS : 'Succcess',
    NOT_FOUND : 'Not Found',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    INTERNAL_SERVER_ERROR: 'Internal Server Error'
};

export default class HttpResponse {
    Ok(res, data){
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: ErrorMessage.SUCCESS,
            data: data
        })
    };

    NotFound(res, data){
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: ErrorMessage.NOT_FOUND,
            error: data
        })
    };

    Unauthorized(res, data){
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: ErrorMessage.UNAUTHORIZED,
            error: data
        })
    };

    Forbidden(res, data){
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message: ErrorMessage.FORBIDDEN,
            error: data
        })
    };

    ServerError(res, data){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: ErrorMessage.INTERNAL_SERVER_ERROR,
            error: data
        })
    };
};