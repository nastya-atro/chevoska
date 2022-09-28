export interface CommonResponseBody {
    errorCode?: string | number;
    message?: any;
    payload?: any;
    status?: string;
}
export declare const createResponse: (body?: CommonResponseBody) => any;
export declare const response: {
    ok: (body?: CommonResponseBody) => any;
    error: (body?: CommonResponseBody) => any;
};
