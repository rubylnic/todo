import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from '../firebase-config';
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from '../firebase-config';
import File from './File';
import checkDate from '../helpers/checkDate';

/**
 * Компонент для вывода информации о таске в списке
 *
 * @component
 * @example
 * 
 * return (
 *   <TodoItem task={item} setIfReload={setIfReload} />
 * )
 */
function TodoItem({ task, setIfReload }) {
    const taskDoc = doc(db, "tasks", task.id);
    const [checked, setChecked] = useState(task.checked);
    const [tooLate, setTooLate] = useState(false)
    const [fileSrc, setFileSrc] = useState('')
    const navigate = useNavigate();
    let filesRef;

    if (task.fileName) {
        filesRef = ref(storage, `files/${task.fileName}`);
    }

    useEffect(() => {
        setTooLate(checkDate(task.dueTime));
        setIfReload(false)
        if (task.fileName) {
            getDownloadURL(filesRef)
                .then((url) => {
                    setFileSrc(url);
                })
                .catch(() => {
                    console.error('error with file uploading');
                    // setIfReload(true)
                })
        }
    }, [task])

    /**
* Переходит на страницу просмотра таска
*
* @function todoItemClickHandler
*/

    const todoItemClickHandler = () => {
        navigate("/todo/todo", {
            state: {
                ...task,
                fileSrc: fileSrc
            },
        })
    }
    /**
   * Переходит на страницу редактирования таска
   *
   * @function editClickHandler
   */
    const editClickHandler = (evt) => {
        evt.stopPropagation();
        navigate("/todo/setTodo", { state: task });
    }
    /**
   * Удаляет таск и файлы из базы данных
   *
   * @async
   * @function deleteClickHandler
   */
    const deleteClickHandler = async (evt) => {
        evt.stopPropagation();
        await deleteDoc(taskDoc);
        if (task.fileName) {
            deleteObject(filesRef).then(() => {
                console.log('file deleted');
            }).catch((error) => {
                console.error('error with file deletion')
            })
        }
        setIfReload(true)
    }

    /**
* меняет состояние таска с активного на неактивный и наоборот
*
* @async
* @function checkboxChangeHandler
*/
    const checkboxChangeHandler = async (evt) => {
        evt.stopPropagation();
        setChecked(!checked);
        await updateDoc(taskDoc, { checked: !checked });
    }

    return (
        <div className={checked ? "todo__item todo__item--checked" : "todo__item"} onClick={todoItemClickHandler}>
            <label className='checkbox' onClick={(evt) => { evt.stopPropagation() }}>
                <input className='checkbox__input' type="checkbox" checked={checked} onChange={checkboxChangeHandler} />
                <span className='checkbox__indicator'></span>
            </label>
            <h2 className='todo__title'>{task.title}</h2>
            <p className='todo__text'>{task.text}</p>
            <div className="todo__bottom">
                <div className="todo__left">
                    {task.dueTime ? <p className={tooLate ? "todo__date todo__date--late" : "todo__date"}>{task.dueTime}</p> : ""}
                    <>{task.fileName ? <File fileSrc={fileSrc} fileType={task.fileType.slice(0, 5)} width={50} /> : ""}
                    </>
                </div>
                <div className="todo__right todo__buttons">
                    <button className="button" onClick={deleteClickHandler}>delete</button>
                    <button className="button" onClick={editClickHandler}>edit</button>
                </div>
            </div>


        </div>
    )
}
export default TodoItem;