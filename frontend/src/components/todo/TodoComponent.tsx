import { useParams, useSearchParams } from "react-router-dom"
import { retrieveTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import type { AxiosResponse } from "axios";
import { Field, Formik, Form } from "formik";


// Formik 폼에서 사용할 값 타입
type todoValues = {
    description: string;
    targetDate: string;
}

// 서버에서 받아올 Todo 데이터 타입
type Todo = {
    id: number;
    description: string;
    done: boolean;
    targetDate: string;
}

// YYYY-MM-DD 로 문자열 반환하는 함수
function toYmdLocal(d: Date | string | null | undefined): string {
    const date = typeof d === "string" ? new Date(d) : (d ?? new Date());
    // 로컬 기준 YYYY-MM-DD
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
    }

export default function TodoComponent() {
    // URL 파라미터 (id) 추출
    const {id} = useParams<{id:string}>();
    const todoId = id ? Number(id) : NaN;
    
    // 로컬 상태 관리 (Formik과 연동할 초기값)
    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState(toYmdLocal(new Date()));

    // 인증 컨텍스트에서 로그인된 사용자명 가져오기
    const authContext = useAuth()
    const username = authContext.username

    // 컴포넌트 마운트 (username, todoId 변경 시 데이터 조회)
    useEffect(() => {
            retrieveTodo();
        }, [username, todoId]
    )

    // 서버에서 Todo 데이터 가져오기
    function retrieveTodo() {
        console.log(username, todoId)
        if (!username || Number.isNaN(todoId)) return;

        retrieveTodoApi(username!, todoId) 
        .then((res: AxiosResponse) => {
            console.log(res.data);
            setDescription(res.data.description ?? "");
            setTargetDate(res.date.targetDate ?? new Date());
        })
        .catch((err) => console.log(err))
            
    }

    // Formik onSubmit 상태 핸들러
    const onSubmit = (values: todoValues) => {
        console.log(values)
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                {/* Fromik 폼 상태 관리 자동화 + 제출 처리, 별도의 useState를 여러 개 쓸 필요 없음 */}
                <Formik<todoValues>
                    initialValues={ {description, targetDate } } // 초기값
                    enableReinitialize= {true} // initialValues 변경 시 폼 값 자동 업데이트
                    validationSchema={""} // Yub으로 유효성 검사 추가 가능
                    onSubmit={onSubmit} // 제출 시 실행
                    >
                    {
                        (props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label htmlFor="">Description</label>
                                    <Field type="text" className="form-control" name="description"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label htmlFor="">Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"></Field>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}