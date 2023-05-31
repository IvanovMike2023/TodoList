import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type TodoListType = {
    id: string
    title: string
    filter: FilterText
}
type AssocTaskType = {
    [key: string]: TaskType[]
}
export type FilterText = 'All' | 'Completed' | 'Active'

function App() {
    let todolists1 = v1()
    let todolists2 = v1()
    const [todolists, setTodolists] = useState<TodoListType[]>([
        {id: todolists1, title: 'What to learn', filter: 'All'},
        {id: todolists2, title: 'How to learn', filter: 'Active'}
    ])
    let [tasks, setTasks] = useState<AssocTaskType>({
        [todolists1]: [
            {taskId: v1(), title: "HTML&CSS2", isDone: true},
            {taskId: v1(), title: "JS2www", isDone: false},
            {taskId: v1(), title: "JS2", isDone: true},
            {taskId: v1(), title: "JS2", isDone: true},
            {taskId: v1(), title: "JS2", isDone: true},
            {taskId: v1(), title: "JS2", isDone: true},
            {taskId: v1(), title: "JS2", isDone: true}
        ],
        [todolists2]: [
            {taskId: v1(), title: "HTML&CSS2", isDone: true},
            {taskId: v1(), title: "JS2www", isDone: false},
            {taskId: v1(), title: "JS2", isDone: true},
            {taskId: v1(), title: "JS2", isDone: true}
        ]
    })

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        setTasks({...tasks,[todolistId]: tasks[todolistId].map(el => el.taskId === taskId ? {...el, isDone: newIsDoneValue} : el)
        })

    }
    const removeTask = (todolistId: string, Id: string) => {

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.taskId != Id)})
    }

const removeTodoList=(todolistId:string)=>{
setTodolists(todolists.filter(el=>el.id!=todolistId))
}
    const AddTasks = (todolistId: string, title: string) => {

        let newTask: TaskType = {
            taskId: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})

    }
    const ChangeFilter = (todolistId: string, newfilter: FilterText) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: newfilter} : el))

    }

    return (
        <div className="App">
            {todolists.map(el => {
                    let currenttasks = tasks[el.id]
                    if (el.filter === 'Active')
                        currenttasks = tasks[el.id].filter(t => !t.isDone)
                    if (el.filter === 'Completed')
                        currenttasks = tasks[el.id].filter(t => t.isDone)
                    return <TodoList
                        key={el.id}
                        todolistId={el.id}
                        removeTask={removeTask}
                        filter={el.filter}
                        changeTaskStatus={changeTaskStatus}
                        ChangeFilter={ChangeFilter}
                        title={el.title}
                        tasks={currenttasks}
                        removeTodoList={removeTodoList}
                        AddTasks={AddTasks}
                    />
                }
            )}

        </div>
    );
}

export default App;
