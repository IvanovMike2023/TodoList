import React, {FC} from "react";
import {FilterText} from "./App";

 type PropsTasks = {
    taskId: number,
    title: string,
    isDone: boolean
}

 export interface PropsData {
    title: string,
    tasks: PropsTasks[],
     remove: (n:FilterText)=>void

 }


const TodoList: FC<PropsData> = (props) => {

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(m=><li key={m.taskId}><input type="checkbox" checked={m.isDone}/>
                    <span>{m.title}</span></li>
                )}
            </ul>
            <div>
                <button onClick={()=>props.remove('All')}>All</button>
                <button onClick={()=>props.remove('Active')}>Active</button>
                <button onClick={()=>props.remove('Completed')}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList