import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import File from '../components/File';
import { db } from '../firebase-config';
import checkDate from '../helpers/checkDate';


export default function Todo() {
    const location = useLocation();
    const [tooLate, setTooLate] = useState(false);
    const task = location.state;
    const [checked, setChecked] = useState(task.checked)
    const taskDoc = doc(db, "tasks", task.id);

    useEffect(() => {
        setTooLate(checkDate(task.dueTime))
    }, [])

    const checkboxChangeHandler = async (evt) => {
        evt.stopPropagation();
        setChecked(!checked);
        await updateDoc(taskDoc, { checked: !checked });
    }
    return (

        <div className={task.checked ? "todo__item todo__item--big todo__item--checked" : "todo__item todo__item--big"}>
            <label className='checkbox'>
                <input className='checkbox__input' type="checkbox" checked={checked} onChange={checkboxChangeHandler} />
                <span className='checkbox__indicator'></span>
            </label>
            <h2 className='todo__title'>{task.title}</h2>
            <p className='todo__text'>{task.text}</p>
            <p className={tooLate ? "todo__date todo__date--late" : "todo__date"}>{task.dueTime}</p>
            <>{task.fileName ? <File fileSrc={task.fileSrc} fileType={task.fileType.slice(0, 5)} width={300} /> : ""}
            </>

        </div>

    )
}
