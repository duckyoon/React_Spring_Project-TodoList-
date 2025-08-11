import { useEffect, useState, type FC } from "react";
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoApiService";
import type { AxiosResponse } from "axios";

const ListTodoComponent: FC = () => {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDate());

    type Todo = {
        id: number;
        description: string;
        done: boolean;
        targetDate: string;
    }

    const [todos, setTodos] = useState<Todo[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => refreshTodos(), []); // 컴포넌트 마운트시 한 번만 실행
    
    function refreshTodos() {
        retrieveAllTodosForUsernameApi('junes')
            .then((res: AxiosResponse<Todo[]>) => {
                console.log(res);
                setTodos(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function deleteTodo(id:number) {
        console.log("clicked " + id);
        deleteTodoApi('junes', id)
        .then(
            (res: AxiosResponse) => {
            console.log(res);
            refreshTodos();
            setMessage(`Delete of todo ${id} successful`);
        })
        .catch(err => console.log(err));
    }


    return (
        <div className='container'>
            <h2>Things you want to do!</h2>
            {message && <div className="alert alert-success">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Description</td>
                            <td>Done</td>
                            <td>Target Date</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done ? 'Yes' : 'No'}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                </tr>
                            )) 
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default ListTodoComponent;