import React, {FC} from "react";
import {FilterText} from "./App";

export type Task = {
    taskId: number,
    title: string,
    isDone: boolean
}

export interface TodoPropsType {
    title: string,
    tasks: Task[],
    ChangeFilter:(name:FilterText)=>void
}

const TodoList: FC<TodoPropsType> = (props) => {
    const TasksJSX: Array<JSX.Element> = props.tasks.map((m: Task) => {
        return (
            <li key={m.taskId}><input type="checkbox" checked={m.isDone}/>
                <span>{m.title}</span></li>
        )
    })
    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {TasksJSX}
            </ul>
            <div>
                <button onClick={()=>props.ChangeFilter('All')}>All</button>
                <button onClick={()=>props.ChangeFilter('Active')}>Active</button>
                <button onClick={()=>props.ChangeFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList