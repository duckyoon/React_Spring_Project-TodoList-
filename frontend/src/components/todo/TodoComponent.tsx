import { useParams, useSearchParams } from "react-router-dom"
import { retrieveTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import type { AxiosResponse } from "axios";

export default function TodoComponent() {

    const {id} = useParams<{id:string}>();
    const todoId = id ? Number(id) : NaN;
    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const authContext = useAuth()
    const username = authContext.username

    type Todo = {
            id: number;
            description: string;
            done: boolean;
            targetDate: string;
        }

    useEffect(() => {
            retrieveTodo();
        }, [username, todoId]
    )

    function retrieveTodo() {
        console.log(username, todoId)
        if (!username || Number.isNaN(todoId)) return;
        retrieveTodoApi(username!, todoId) 
        .then((res: AxiosResponse) => {
            console.log(res.data);
            setDescription(res.data.description ?? "");
        })
        .catch((err) => console.log(err))
            
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                description : {description}
            </div>
        </div>
    )
}