import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase-config';
import { ref, uploadBytes } from "firebase/storage";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Компонент для создания или изменения таска
 *
 * @component
 */
function SetTodo() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [dueTime, setDueTime] = useState('');
    const [file, setFile] = useState(null);
    const tasksCollectionRef = collection(db, "tasks");
    const [alert, setAlert] = useState(false)

    const location = useLocation();
    const task = location.state;

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setText(task.text)
            setDueTime(task.dueTime)
        }
    }, [task])

    /**
 * Загружает файлы с базы данных
 *
 * @async
 * @function uploadFile
 */
    const uploadFile = async () => {
        const filesRef = ref(storage, `files/${file?.name}`);
        await uploadBytes(filesRef, file).then((snapshot) => {
            console.log('Uploaded a file!');
        });
    }
    /**
 * Создает или обновляет todo в базе данных
 *
 * @async
 * @function setTodo
 */
    const setTodo = async (evt) => {
        evt.preventDefault();
        // если редактирование
        if (task) {
            const taskDoc = doc(db, "tasks", task.id);
            const newFields = { ...newTask };
            await updateDoc(taskDoc, newFields);
            // если создание
        } else {
            if (!title) {
                setAlert(true)
                return;
            }
            setAlert(false)
            await addDoc(tasksCollectionRef, newTask);
            if (file) { uploadFile() }
        }

        navigate('/')
    };

    /**
 * newTask создание нового таска
 * @typedef newTask
 * @property {boolean} checked выполнен таск или нет
 * @property {string} title название
 * @property {string} text описание
 * @property {string} dueTime дата до которой нужно выполнить таск
 * @property {string} fileName имя файла
 * @property {string} fileType расширение файла

 */
    const newTask = {
        checked: false,
        title: title,
        text: text,
        dueTime: dueTime,
        fileName: file ? file.name : '',
        fileType: file ? file.type : ''
    }

    return (
        <>
            <h2 className='todo__subtitle'>Set Todo</h2>
            <form className="todo__form" onSubmit={setTodo}>
                <label className='todo__label'>
                    <span className='todo__label-text'>Title</span>
                    <input
                        className='todo__input'
                        type="text"
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                        value={title}
                    />
                </label>
                <label className='todo__label'>
                    <span className='todo__label-text'>Text</span>
                    <input
                        className='todo__input'
                        type="text"
                        onChange={(event) => {
                            setText(event.target.value);
                        }}
                        value={text}
                    />
                </label>
                <label className='todo__label'>
                    <span className='todo__label-text'>Due time</span>
                    <input
                        className='todo__input'
                        type="date"
                        onChange={(event) => {
                            setDueTime(event.target.value);
                        }}
                        value={dueTime}
                    />
                </label>
                <label className='todo__label'>
                    <span className='todo__label-text'>Attach files</span>
                    <input
                        className='todo__file-input'
                        type="file"
                        onChange={(event) => {
                            setFile(event.target.files[0]);
                        }} />
                </label>
                {alert ? <p className='todo__alert'>You need a title for this task!</p> : ''}
                <input className='button' type="submit" />
            </form>
        </>
    )
}
export default SetTodo;