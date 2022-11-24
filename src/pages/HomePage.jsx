import React from 'react'
import { useNavigate } from 'react-router-dom'
import TodoList from '../components/TodoList'

export default function HomePage() {
    const navigate = useNavigate();
    /** @function myFunction 
     * Функция-обработчик клика по кнопке добавления нового таска, переносит на страницу создания таска**/
    function addNewTaskHandler() {
        navigate("/todo/setTodo")
    }
    return (
        <div className='todo__container'>
            <button className="button" onClick={addNewTaskHandler}>Add new task</button>
            <TodoList />
        </div>
    )
}
