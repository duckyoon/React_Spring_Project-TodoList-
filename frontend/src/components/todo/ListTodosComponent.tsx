import { useEffect, useState, type FC } from "react";
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoApiService";
import type { AxiosResponse } from "axios";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

const ListTodoComponent: FC = () => {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDate());

    // 인증 정보
    const authContext = useAuth(); // AuthContext 사용
    const username = authContext.username || 'junes'; // 기본값으로 'junes' 사용

    // 라우팅 훅
    const navigate = useNavigate();

    // 서버 Todo 타입
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
        retrieveAllTodosForUsernameApi(username)
            .then((res: AxiosResponse) => {
                console.log(res);
                setTodos(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function deleteTodo(id:number) {
        console.log("clicked " + id);
        deleteTodoApi(username, id)
        .then(
            (res: AxiosResponse) => {
            console.log(res);
            refreshTodos();
            setMessage(`Delete of todo ${id} successful`);
        })
        .catch(err => console.log(err));
    }

    function updateTodo(id:number) {
        console.log("clicked " + id);
        navigate(`/todos/${id}`)
    }

    function addNewTodo() {
        navigate(`/todos/-1`)
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
                            <td>Update</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done ? 'Yes' : 'No'}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )) 
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-3" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}


export default ListTodoComponent;