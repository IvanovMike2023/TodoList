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
    ChangeFilter: (name: FilterText) => void,
    AddTasks: (title: string) => void
}
const TodoList: FC<TodoPropsType> = (props) => {
    const TasksJSX: Array<JSX.Element> = props.tasks.map((m: TaskType) => {

        return (
            <li key={m.taskId}><input type="checkbox" checked={m.isDone}/>
                <span>{m.title}</span></li>
        )
    })
    let [titleTasks, settitleTasks] = useState('')
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => settitleTasks(e.currentTarget.value)
    const addTaskHandler = ()=> {
        props.AddTasks(titleTasks)
        settitleTasks('')
    }

    const handlerCreator=(filter:FilterText)=>()=> props.ChangeFilter(filter)
    const titleMaxLength = 25
    const isAddBtnDisabled: boolean = !titleTasks.length  || titleTasks.length > titleMaxLength
    const isTitleLengthTooLong: boolean = titleTasks.length > titleMaxLength
    const addTaskonKeyHandler=(e:KeyboardEvent<HTMLInputElement>)=>{e.key ==='Enter' && !isAddBtnDisabled && addTaskHandler()  }
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: 'red'}}>Title is to long</div>
        : null
    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input onChange={setTitleHandler} value={titleTasks} onKeyDown={addTaskonKeyHandler}/>
                <button disabled={isAddBtnDisabled} onClick={addTaskHandler}>+
                </button>
                {titleMaxLengthWarning}
            </div>
            <ul>
                {TasksJSX}
            </ul>
            <div>
                <button onClick={handlerCreator('All')}>All</button>
                <button onClick={handlerCreator('Active')}>Active</button>
                <button onClick={handlerCreator('Completed')}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList