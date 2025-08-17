import { Link, useParams } from 'react-router-dom';
import { useState, type FC } from 'react';
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import type { AxiosResponse } from 'axios';
import { useAuth } from './security/AuthContext';


const WelcomeComponent: FC = () => {
    const {username} = useParams<{ username: string }>();
    console.log("WelcomeComponent rendered with username:", username);
    const [message, setMessage] = useState<string>("");

    const authContext = useAuth();

    console.log(username);

    function callHelloWorldApi() {
        // 여기에 API 호출 로직을 추가할 수 있습니다.
        console.log("Hello World API called");

        retrieveHelloWorldPathVariable('Yoon', authContext.token)
            .then(response => {
                successfulResponse(response);
            })
            .catch(error => {
                errorResponse(error);
            })
            .finally(() => {
                console.log("API call completed");
            });
    }

    interface HelloWorldBean {
        message: string;
    }

    function successfulResponse(response: AxiosResponse<HelloWorldBean>) {
        console.log(response);
        setMessage(response.data.message);
    }

    function errorResponse(error: any){
        console.log(error);
        if (error.message) {
            setMessage(error.message);
        } else {
            setMessage("Something went wrong. Please try again later.");
        }
    }

    return (
        <div className="Welcome">
            <div className='container'>
                <h1>Welcome {username}</h1>
                <div>
                    {/* Link를 사용해 특정 컴포넌트만 새로고침. */}
                    Manage Your todos. <Link to="/todos">Click here </Link> to see your todos.
                </div>
                <div>
                    <button className='btn btn-success' onClick={callHelloWorldApi}>Call REST API</button>
                </div>
            </div>
            <div className='text-info'>{message}</div>
        </div>
    )
}
export default WelcomeComponent;