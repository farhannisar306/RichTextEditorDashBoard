export const QueryService = async ({ QueryURL, Method, Body }: { QueryURL: string, Body: object | undefined, Method: string }) => {
    const response = await fetch(QueryURL, {
        method: Method,
        body: Body ? JSON.stringify(Body) : null,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.ok && await response.json();
};