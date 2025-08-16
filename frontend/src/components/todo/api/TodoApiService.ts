import apiClient from './apiClient';

// 서버가 반환하는 Todo (응답 타입)
export interface TodoBean {
    id: Number;
    description(description: any): unknown;
    done: boolean;
    targetDate: string;
    message?: string;
    username?: string;

}

// 생성/수정 요청 payload (요청 타입)
export type TodoPayload = {
    description: string;
    targetDate: string;
    done: boolean;
}

// export default function retreiveHelloWorldBean() {
//     return axios.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean`);
// }

// 전체 Todo 조회
export const retrieveAllTodosForUsernameApi
    = (username:string) => apiClient.get<TodoBean>(`/users/${username}/todos`);

// Todo 삭제
export const deleteTodoApi
    = (username:string, id:number) => apiClient.delete<void>(`/users/${username}/todos/${id}`);

// 단일 Todo 조회
export const retrieveTodoApi
    = (username:string, id:number) => apiClient.get<TodoBean>(`/users/${username}/todos/${id}`);

// 기존 Todo 수정
export const updateTodoApi = (username: string, id: number, todo: TodoPayload) => {
    return apiClient.put<TodoBean>(`/users/${username}/todos/${id}`, todo);
}

// 신규 Todo 생성
export const createTodoApi = (username: string, todo: TodoPayload) => {
    return apiClient.post<TodoBean>(`/users/${username}/todos`, todo);
}