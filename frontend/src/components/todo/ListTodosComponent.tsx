import { useEffect, useState, type FC } from "react";
import { retrieveAllTodosForUsername } from "./api/TodoApiService";
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

    useEffect(() => refreshTodos(), []); // 컴포넌트 마운트시 한 번만 실행
    
    function refreshTodos() {
        retrieveAllTodosForUsername('junes')
            .then((res: AxiosResponse<Todo[]>) => {
                console.log(res);
                setTodos(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='container'>
            <h2>Things you want to do!</h2>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Description</td>
                            <td>Done</td>
                            <td>Target Date</td>
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