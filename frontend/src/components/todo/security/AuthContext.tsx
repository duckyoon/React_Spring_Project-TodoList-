import React, { createContext, useContext, useState } from 'react';

// 1. Context 데이터 타입 정의
type AuthContextType = {
    number: number;
    setNumber: React.Dispatch<React.SetStateAction<number>>; // setNumber는 선택적 함수로 정의
    isAuthenticated?: boolean; // 선택적 속성으로 정의
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // 선택적 함수로 정의

    login: (username: string, password: string) => boolean; // 로그인 함수 정의
    logout: () => void; // 로그아웃 함수 정의
    username?: string;
}

// 2. Context 생성 (초기값은 null로 싯작, 단 타입 단언 필요)
// Partial을 사용하여 AuthContextType의 모든 속성을 선택적으로 만듭니다.
export const AuthContext = createContext<Partial<AuthContextType | undefined>>(undefined);


// 어떤 클래스에서 authContext를 사용하고 싶다면, useAuth 훅을 사용하여 접근할 수 있습니다.
export const useAuth = () => {
    const constext = useContext(AuthContext);
    if (!constext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return constext;
}

// 3. Props 타입 정의
type AuthProviderProps = {
    children: React.ReactNode; // children은 React 컴포넌트의 자식 요소를 의미
}

// 4. Provider 컴포넌트 정의
export default function AuthProvider({children }: AuthProviderProps) {
    // AuthProvider 하위의 모든 컴포넌트카 children이 된다.

    const [number, setNumber] = useState(0)

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [username, setUsername] = useState<string| undefined>(undefined);

    const login = (username: string, password: string): boolean => {
        if (username === 'junes' && password === '1234') {
            setIsAuthenticated(true); // 인증 상태 업데이트
            setUsername(username); // 로그인 성공 시 username 설정
            return true; // 로그인 성공 시 true 반환
        } else {
            setIsAuthenticated(false); // 인증 실패 시 상태 업데이트
            setUsername(undefined); // 로그인 실패 시 username 초기화
            return false; // 로그인 실패 시 false 반환
        }
    }

    const logout = () => {
        setIsAuthenticated(false); // 로그아웃 시 인증 상태 업데이트
    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, login, logout, username } }>
            {/* 하위 컴포넌트에 value 공유 */}
            {children}
        </AuthContext.Provider>
    );
}