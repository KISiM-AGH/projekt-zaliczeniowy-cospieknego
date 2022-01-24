import useAuth from './useAuth';

type Methods = 'GET' | 'POST' | 'PUT' | 'UPDATE' | 'DELETE';

export default function useApi() {
    const { currentUser, isLoggedIn } = useAuth();

    const request = (method: Methods) => {
        return (target: string, body?: {}) => {
            const options: any = {
                headers: authHeader(),
                method,
            };
            if (body && options) {
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(body);
            }
            return fetch(
                `http://localhost:8080/api/v1/${target}`,
                options
            ).then(handleResponse);
        };
    };

    const authHeader = (): HeadersInit => {
        if (isLoggedIn && currentUser) {
            return { Authorization: `Bearer ${currentUser?.token}` };
        }
        return {};
    };

    const handleResponse = (response: Response) => {
        return response.text().then((text) => {
            const data = text && JSON.parse(text);

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    };

    return {
        get: request('GET'),
        put: request('PUT'),
        post: request('POST'),
        update: request('UPDATE'),
        delete: request('DELETE'),
    };
}
