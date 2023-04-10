import React, {useState} from 'react';
import './App.css';
import TodoList, { TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterText = 'All' | 'Completed' | 'Active'

function App() {
    const TodoTitle: string = "What to do"
    let [task, SetTask] = useState([
        {taskId: v1(), title: "HTML&CSS2", isDone: true},
        {taskId: v1(), title: "JS2", isDone: false},
        {taskId: v1(), title: "JS2", isDone: true},
        {taskId: v1(), title: "JS2", isDone: true},
        {taskId: v1(), title: "JS2", isDone: true},
        {taskId: v1(), title: "JS2", isDone: true},
        {taskId: v1(), title: "JS2", isDone: true}
    ])
    let [filter, Setfilter] = useState<FilterText>('All')
    const AddTasks = (title: string) => {
        let newTask: TaskType= {
            taskId: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...task]
        SetTask(newTasks)
    }
    const ChangeFilter = (newfilter: FilterText) => {
        Setfilter(newfilter)
    }
    const getTasks = (tasks: TaskType[], newfilter: FilterText) => {
        switch (newfilter) {
            case "Active":
                return task.filter(t => !t.isDone )

            case "Completed":
                return task.filter(t => !t.isDone )

            default:
                return task
        }
    }

    return (
        <div className="App">
            <TodoList ChangeFilter={ChangeFilter} title={TodoTitle} tasks={getTasks(task, filter)} AddTasks={AddTasks}/>

        </div>
    );
}

export default App;
