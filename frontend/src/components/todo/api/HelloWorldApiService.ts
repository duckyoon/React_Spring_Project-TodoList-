import apiClient from './apiClient';

export interface HelloWorldBean {
    message: string;
}

export interface TokenBean {
    token : string;
}

// export default function retreiveHelloWorldBean() {
//     return axios.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean`);
// }

export const retrieveHelloWorldBean
    = () => apiClient.get<HelloWorldBean>(`/hello-world-bean`);

export const retrieveHelloWorldPathVariable
    = (username: string) => apiClient.get<HelloWorldBean>(`/hello-world/path-variable/${username}`, {
        headers: {
            Authorization: 'Basic Auth'
        }
    });

export const executeBasicAuthenticationService
    = (token: string) => apiClient.get<TokenBean>(`/basicauth`, {
        headers: {
            Authorization: token
        }
    });