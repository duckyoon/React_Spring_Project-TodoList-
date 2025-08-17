import { FC, useState } from 'react';
import { useNavigate,} from 'react-router-dom';
import { useAuth } from './security/AuthContext';

const LoginComponent: FC = () => {

    const [username, setUsername] = useState('junes');
    const [password, setPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();

    const authContext = useAuth();

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    async function handleSubmit() {
        if (await authContext.login?.(username, password)) {
            navigate(`/welcome/${username}`); // 로그인 성공 시 Welcome 페이지로 이동
        } else {
            setShowErrorMessage(true);
        }
    }
    
    return (
        <div className="Login">
            <div className='container'>
                <h1>Go Login!</h1>
                {/* 각 메시지가 true 일 때만 UI에 표시 */}
                {showErrorMessage && <div className='errorMessage'>Authenticated Failed. Please check your credentials.</div>}
                <div className='LoginForm'>
                    <div>
                        <label htmlFor="">User Name</label>
                        <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="Password" name="Password" id="username" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div>
                        <button type="button" name='login' onClick={handleSubmit}>login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginComponent;