import React, {FC} from "react";

 type PropsTasks = {
    taskId: number,
    title: string,
    isDone: boolean
}
 type PropsStudents = {
}
 export interface PropsData {
    title: string,
    tasks: PropsTasks[],
     students: PropsStudents[]

 }

type PropsType = {
    data: PropsData

}
const TodoList: FC<PropsType> = (props) => {
//const TodoList=(props:PropsType)=>{
    //const tasks=props.data.tasks

    const data=props.data
    console.log(data)
    return (
        <div className="todolist">
            <h3>{data.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={data.tasks[0].isDone}/> <span>{data.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={data.tasks[1].isDone}/> <span>{data.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={data.tasks[2].isDone}/> <span>{data.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
export default TodoList