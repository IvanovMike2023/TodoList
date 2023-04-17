import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterText = 'All' | 'Completed' | 'Active'

function App() {
    const TodoTitle: string = "What to do"
    let [tasks, SetTasks] = useState([
        {taskId: v1(), title: "HTML&CSS2", isDone: true},
        {taskId: v1(), title: "JS2www", isDone: false},
        {taskId: v1(), title: "JS2", isDone: true},
        {taskId: v1(), title: "JS2", isDone: true},
        {taskId: v1(), title: "JS2", isDone: true},
        {taskId: v1(), title: "JS2", isDone: true},
        {taskId: v1(), title: "JS2", isDone: true}
    ])
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        SetTasks(tasks.map(t => t.taskId === taskId ? {...t, isDone: newIsDoneValue} : t))
    }
const removeTask=(Id:string)=>{
        SetTasks(tasks.filter(t=>t.taskId!=Id))
}

    let [filter, Setfilter] = useState<FilterText>('All')
    const AddTasks = (title: string) => {
        let newTask: TaskType = {
            taskId: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        SetTasks(newTasks)
    }
    const ChangeFilter = (newfilter: FilterText) => {
        Setfilter(newfilter)
    }
    const getTasks = (tasks: TaskType[], newfilter: FilterText) => {
        switch (newfilter) {
            case "Active":
                return tasks.filter(t => !t.isDone)
            case "Completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    return (
        <div className="App">
            <TodoList removeTask={removeTask} filter={filter} changeTaskStatus={changeTaskStatus} ChangeFilter={ChangeFilter} title={TodoTitle} tasks={getTasks(tasks, filter)} AddTasks={AddTasks}/>
        </div>
    );
}
export default App;
