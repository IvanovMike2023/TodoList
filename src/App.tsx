import React, {useState} from 'react';
import './App.css';
import TodoList, {Task} from "./TodoList";

export type FilterText = 'All' | 'Completed' | 'Active'

function App() {
    const TodoTitle: string = "What to do"
    let [task, SetTask] = useState([
        {taskId: 1, title: "HTML&CSS2", isDone: true},
        {taskId: 2, title: "JS2", isDone: false},
        {taskId: 3, title: "JS2", isDone: true},
        {taskId: 4, title: "JS2", isDone: true},
        {taskId: 5, title: "JS2", isDone: true},
        {taskId: 6, title: "JS2", isDone: true},
        {taskId: 7, title: "JS2", isDone: true}
    ])
    let [filter, Setfilter] = useState<FilterText>('Active')

    const ChangeFilter = (newfilter: FilterText) => {
        Setfilter(newfilter)
    }
    const getTasks = (tasks: Task[], newfilter: FilterText) => {
        switch (newfilter) {
            case "Active":
                return task.filter(t => t.isDone !== false)

            case "Completed":
                return task.filter(t => t.isDone !== true)

            default:
                return task
        }
    }

    return (
        <div className="App">
            <TodoList ChangeFilter={ChangeFilter} title={TodoTitle} tasks={getTasks(task, filter)}/>

        </div>
    );
}

export default App;
