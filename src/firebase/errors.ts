
export type SecurityRuleContext = {
    path: string;
    operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
    requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
    public readonly context: SecurityRuleContext;
    public readonly originalError?: Error;

    constructor(context: SecurityRuleContext, originalError?: Error) {
        const contextString = JSON.stringify({
            operation: context.operation,
            path: context.path,
            ...(context.requestResourceData && { resource: context.requestResourceData }),
        }, null, 2);

        const message = `Firestore Permission Denied for ${context.operation.toUpperCase()} on ${context.path}. Context: ${contextString}`;
        super(message);
        this.name = 'FirestorePermissionError';
        this.context = context;
        this.originalError = originalError;

        Object.setPrototypeOf(this, FirestorePermissionError.prototype);
    }
}
