import apiClient from './apiClient';

export interface TodoBean {
    message: string;
}

// export default function retreiveHelloWorldBean() {
//     return axios.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean`);
// }

export const retrieveAllTodosForUsernameApi
    = (username:string) => apiClient.get<TodoBean>(`/users/${username}/todos`);

export const deleteTodoApi
    = (username:string, id:number) => apiClient.delete<TodoBean>(`/users/${username}/todos/${id}`);

