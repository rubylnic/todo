import React from 'react'
import { useNavigate } from 'react-router-dom'
import TodoList from '../components/TodoList'

export default function HomePage() {
    const navigate = useNavigate();
    const addNewTaskHandler = () => {
        navigate("/todo/setTodo")
    }
    return (
        <div className='todo__container'>
            <button className="button" onClick={addNewTaskHandler}>Add new task</button>
            <TodoList />
        </div>
    )
}
