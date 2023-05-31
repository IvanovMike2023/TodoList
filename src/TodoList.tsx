import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {FilterText} from "./App";

export type TaskType = {
    taskId: string,
    title: string,
    isDone: boolean
}

export interface TodoPropsType {
    title: string
    tasks: TaskType[]
    todolistId:string
    filter: string
    removeTodoList:(todolistId:string)=>void
    ChangeFilter: (todolistId:string,name: FilterText) => void
    AddTasks: (todolistId: string,title: string) => void
    changeTaskStatus: (todolistId:string,taskid: string, newIsDone: boolean) => void
    removeTask:(todolistId:string,id:string)=>void
}

const TodoList: FC<TodoPropsType> = (props) => {
    const TasksJSX: Array<JSX.Element> = props.tasks.map((m: TaskType) => {
        const SetchangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistId,m.taskId, e.currentTarget.checked)
        }
        const setremoveTask=()=>{
            props.removeTask(props.todolistId,m.taskId)
        }
        return (
            <li className={'task-list'} key={m.taskId}><input onChange={SetchangeTaskStatus} type="checkbox" checked={m.isDone}/>
                <span className={m.isDone?'title-span-isDone': ''}>{m.title}</span><button className={'btn-task-list'} onClick={setremoveTask}>x</button></li>
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
            props.AddTasks(props.todolistId,titleTasks)
        }
        else {
            setError(true)
        }
        settitleTasks('')
    }

    const handlerCreator = (todolistId:string,filter: FilterText) => () => props.ChangeFilter(todolistId,filter)
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
    const removeTodoListHandler=()=>{
        props.removeTodoList(props.todolistId)
    }
    return (
        <div className="todolist">
            <h3 className={'title-todolist'}>{props.title}<button onClick={removeTodoListHandler}>x</button></h3>

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
                <button className={props.filter==='All' ? 'filter-btn-active': 'filter-btn'} onClick={handlerCreator(props.todolistId,'All')}>All</button>
                <button className={props.filter==='Active' ? 'filter-btn-active': 'filter-btn'} onClick={handlerCreator(props.todolistId,'Active')}>Active</button>
                <button  className={props.filter==='Completed' ? 'filter-btn-active': 'filter-btn'} onClick={handlerCreator(props.todolistId,'Completed')}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList