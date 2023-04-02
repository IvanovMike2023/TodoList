import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
export type FilterText= 'All' | 'Completed' | 'Active'
function App() {

    const data1 = {
        title: "What to do",

    }
    let initState = [
        {taskId: 1, title: "HTML&CSS2", isDone: true},
        {taskId: 2, title: "JS2", isDone: false},
        {taskId: 3, title: "JS2", isDone: true}
    ]
let [tasks,SetTasks]=useState(initState)
let [filter,Setfilter]=useState<FilterText>('All')


    let taskfortodolist = initState

    if (filter==='Completed'){
        taskfortodolist=tasks.filter(t=>t.isDone===true)
    }
    if (filter==='Active'){
        taskfortodolist=tasks.filter(t=>t.isDone===false)
    }

    let removetask=(newfilter:FilterText)=>{
        return Setfilter(newfilter)
    }


    return (
        <div className="App">
            <TodoList remove={removetask} title={data1.title} tasks={taskfortodolist}  />

        </div>
    );
}

export default App;
