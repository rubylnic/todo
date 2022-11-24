import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
        <nav>
            <Link className="todo__title" to="/todo"><h1>Todo App</h1></Link>
        </nav>
    )
}
