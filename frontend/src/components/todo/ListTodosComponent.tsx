const ListTodoComponent: FC = () => {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDate());

    const todos = [
        {id:1, description: 'Learn React', done: false, targetDate: targetDate },
        {id:2, description: 'Learn Java', done: false, targetDate: targetDate},
        {id:3, description: 'Learn Spring', done: false, targetDate: targetDate},
    ]

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
                                    <td>{todo.targetDate.toDateString()}</td>
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