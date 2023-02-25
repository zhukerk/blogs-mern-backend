export function controllersErrorLogger(controllerClass, controllerMethod, error) {
    console.error(`[${controllerClass}] ${controllerMethod} error: `, error);
}

export function middlewareErrorLogger(middleware, error) {
    console.error(`[${middleware}] error: `, error);
}
