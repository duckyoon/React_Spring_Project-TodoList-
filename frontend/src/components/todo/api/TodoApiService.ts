import apiClient from './apiClient';

export interface TodoBean {
    id: Number;
    description(description: any): unknown;
    done: boolean;
    message: string;
}

// export default function retreiveHelloWorldBean() {
//     return axios.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean`);
// }

export const retrieveAllTodosForUsernameApi
    = (username:string) => apiClient.get<TodoBean>(`/users/${username}/todos`);

export const deleteTodoApi
    = (username:string, id:number) => apiClient.delete<TodoBean>(`/users/${username}/todos/${id}`);

export const retrieveTodoApi
    = (username:string, id:number) => apiClient.get<TodoBean>(`/users/${username}/todos/${id}`);

export const updateTodoApi = (username: string, id: number, todo: TodoBean) => {
    return apiClient.put<TodoBean>(`/users/${username}/todos/${id}`, todo);
}