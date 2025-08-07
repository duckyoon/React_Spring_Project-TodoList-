import { FC,} from 'react';
import './TodoApp.css';

import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodoComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import AuthProvider, { useAuth } from './security/AuthContext';

function AuthenticatedRoute({ children }: any) {
    const authContext = useAuth();
    if (authContext.isAuthenticated) {
        return children; // 인증된 경우 자식 컴포넌트 렌더링
    }
    return <LoginComponent />; // 인증되지 않은 경우 로그인 컴포넌트 렌더링
}

const TodoApp: FC = () => {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        {/* 여기에 라우트 컴포넌트를 추가할 수 있습니다. */}
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodoComponent/>
                            </AuthenticatedRoute>
                            
                        } />
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        } />
                        {/* Route 중 해당하는 경로가 없으면 error로 이동 */}
                        <Route path='*' element={<ErrorComponent/>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
};

export default TodoApp;
