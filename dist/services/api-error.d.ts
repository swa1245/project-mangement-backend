declare class ApiError extends Error {
    statusCode: number;
    message: string;
    success: boolean;
    errors: any[];
    constructor(statusCode: number, message?: string, errors?: any[], stack?: string);
}
export default ApiError;
//# sourceMappingURL=api-error.d.ts.map