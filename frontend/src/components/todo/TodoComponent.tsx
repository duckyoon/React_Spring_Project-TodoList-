import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import type { AxiosResponse } from "axios";
import { Field, Formik, Form, ErrorMessage } from "formik";


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

    // 수정 완료 후 목록 페이지로 이동하기
    const navigate = useNavigate()

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
            setTargetDate(res.data.targetDate ?? new Date());
        })
        .catch((err) => console.log(err))
            
    }

    // Formik onSubmit 상태 핸들러 -> Todo 수정 요청
    const onSubmit = (values: todoValues) => {
        console.log(values)

        const todo = {
            id: id,     // url에서 받은 id
            username: username, // 로그인 사용자
            description: values.description.trim(), // 공백 제거 후 저장
            targetDate: values.targetDate,
            done: false
        }

        updateTodoApi(username, id, todo)
        .then((res: AxiosResponse) => {
            // 수정 성공 시 상태 반영 및 목록으로 이동
            setDescription(res.data.description);
            setTargetDate(res.data.targetDate);
            navigate(`/todos`);
        })
        .catch((err) => console.log(err))

    }

    // Formik validat 함수
    const validate = (values: todoValues) => {
        
        const errors: Partial<Record<keyof todoValues, string>> = {};
        
        // description 검사
        const desc = values.description.trim() ?? "";
        if (!desc) {
            errors.description = 'Enter at a valid description'
        } else if (desc.length < 5) {
            errors.description = 'Enter at least 5 characters'
        }

        // targetDate 검사
        if (values.targetDate == null) {
            errors.targetDate = 'Enter a target date'
        }
        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                {/* Fromik 폼 상태 관리 자동화 + 제출 처리, 별도의 useState를 여러 개 쓸 필요 없음 */}
                <Formik<todoValues>
                    initialValues={ {description, targetDate } } // 초기값
                    enableReinitialize= {true} // initialValues 변경 시 폼 값 자동 업데이트
                    validate={validate} // 유효성 검사 추가
                    validateOnChange= {false}   // 값 입력 시마다 검증하지 않음
                    validateOnBlur= {false}     // 포커스 아웃 시 검증하지 않음
                    onSubmit={onSubmit} // 제출 시 실행
                    >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                 />
                                 <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                 />

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