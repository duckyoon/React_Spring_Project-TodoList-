import apiClient from './apiClient';

export interface TodoBean {
    message: string;
}

// export default function retreiveHelloWorldBean() {
//     return axios.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean`);
// }

export const retrieveAllTodosForUsername
    = (username:string) => apiClient.get<TodoBean>(`/users/${username}/todos`);
