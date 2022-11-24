import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';
import TodoItem from './TodoItem'

/**
 * Компонент для вывода списка тасков
 *
 * @component
 */
function TodoList() {
    const tasksCollectionRef = collection(db, "tasks");
    const [tasks, setTasks] = useState([])
    const [ifReload, setIfReload] = useState(false)
    useEffect(() => {
        /**
* Создает или обновляет todo в базе данных
*
* @async
* @function getTasks
* информация об уже добавленных тасках подгружается из базы данных
*/
        const getTasks = async () => {
            const data = await getDocs(tasksCollectionRef);
            setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getTasks();
    }, [ifReload]);

    return (
        <div className='todo__items'>
            {tasks?.map(item => <TodoItem task={item} setIfReload={setIfReload} key={item.id} />)}
        </div>
    )
}
export default TodoList;