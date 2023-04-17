import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {FilterText} from "./App";

export type TaskType = {
    taskId: string,
    title: string,
    isDone: boolean
}

export interface TodoPropsType {
    title: string,
    tasks: TaskType[],
    filter: string,
    ChangeFilter: (name: FilterText) => void,
    AddTasks: (title: string) => void
    changeTaskStatus: (taskid: string, newIsDone: boolean) => void
    removeTask:(id:string)=>void
}

const TodoList: FC<TodoPropsType> = (props) => {
    const TasksJSX: Array<JSX.Element> = props.tasks.map((m: TaskType) => {
        const SetchangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(m.taskId, e.currentTarget.checked)
        }
        const setremoveTask=()=>{
            props.removeTask(m.taskId)
        }
        return (
            <li className={'task-list'} key={m.taskId}><input onChange={SetchangeTaskStatus} type="checkbox" checked={m.isDone}/>
                <span>{m.title}</span><button onClick={setremoveTask}>x</button></li>
        )
    })
    const [titleTasks, settitleTasks] = useState('')
    const [error, setError] = useState<boolean>(false)
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        settitleTasks(e.currentTarget.value)
    setError(false)
    }
    const addTaskHandler = () => {
        const trimmedtitle=titleTasks.trim()
        if(trimmedtitle){
            props.AddTasks(titleTasks)
        }
        else {
            setError(true)
        }
        settitleTasks('')
    }

    const handlerCreator = (filter: FilterText) => () => props.ChangeFilter(filter)
    const titleMaxLength = 25
    const isAddBtnDisabled: boolean = !titleTasks.length || titleTasks.length > titleMaxLength
    const isTitleLengthTooLong: boolean = titleTasks.length > titleMaxLength
    const addTaskonKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && !isAddBtnDisabled && addTaskHandler()
    }
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: 'red'}}>Title is to long</div>
        : null
    const usermessage =error?
        <div style={{color: 'red'}}>Title is strong reqwired</div>
        :null
    return (
        <div className="todolist">
            <h3 className={'title-todolist'}>{props.title}</h3>
            <div>
                <input onChange={setTitleHandler} value={titleTasks} onKeyDown={addTaskonKeyHandler} className={isTitleLengthTooLong || error ? 'error-input':''}/>
                <button disabled={isAddBtnDisabled} onClick={addTaskHandler}>+
                </button>
                {titleMaxLengthWarning || usermessage}

            </div>
            <ul>
                {TasksJSX}
            </ul>
            <div className={'filter-btn-wrapper'}>
                <button className={props.filter==='All' ? 'filter-btn-active': 'filter-btn'} onClick={handlerCreator('All')}>All</button>
                <button className={props.filter==='Active' ? 'filter-btn-active': 'filter-btn'} onClick={handlerCreator('Active')}>Active</button>
                <button  className={props.filter==='Completed' ? 'filter-btn-active': 'filter-btn'} onClick={handlerCreator('Completed')}>Completed</button>
            </div>yyyyyyyyyyyyyy
        </div>
    )
}
export default TodoList