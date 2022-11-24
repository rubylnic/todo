import React from 'react'
import { Link } from 'react-router-dom'
/**
 * Компонент для вывода навигации приложения
 *
 * @component
 */
function Navigation() {
    return (
        <nav>
            <Link className="todo__title" to="/todo"><h1>Todo App</h1></Link>
        </nav>
    )
}
export default Navigation;