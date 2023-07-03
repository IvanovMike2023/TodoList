import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItem} from "./AddItem";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddTasksAC,
    AddTasksIdAC,
    changeTaskStatusAC,
    onChangeItemAC,
    tasksReducer,
    removeTaskAC
} from "./Reducers/tasksReducer";
import {
    AddTodoListsAC,
    ChangeFilterAC,
    onChangeTitleTodoListAC,
    todolistsReducer,
    removeTodoListAC
} from "./Reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type TodoListType = {
    id: string
    title: string
    filter: FilterText
}
export type AssocTaskType = {
    [key: string]: TaskType[]
}
export type FilterText = 'All' | 'Completed' | 'Active'

function App() {

    //let todolists1 = v1()
    // let todolists2 = v1()
    // const [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
    //     {id: todolists1, title: 'What to learn', filter: 'All'},
    //     {id: todolists2, title: 'How to learn', filter: 'Active'}
    // ])
    // let [tasks, dispatchTasks] = useReducer(tasksReducer,{
    //     [todolists1]: [
    //         {taskId: v1(), title: "HTML&CSS2", isDone: true},
    //         {taskId: v1(), title: "JS2www", isDone: false},
    //         {taskId: v1(), title: "JS2", isDone: true},
    //         {taskId: v1(), title: "JS2", isDone: true},
    //         {taskId: v1(), title: "JS2", isDone: true},
    //         {taskId: v1(), title: "JS2", isDone: true},
    //         {taskId: v1(), title: "JS2", isDone: true}
    //     ],
    //     [todolists2]: [
    //         {taskId: v1(), title: "HTML&CSS2", isDone: true},
    //         {taskId: v1(), title: "JS2www", isDone: false},
    //         {taskId: v1(), title: "JS2", isDone: true},
    //         {taskId: v1(), title: "JS2", isDone: true}
    //     ]
    // })
let state=useSelector<AppRootStateType,AppRootStateType>(state=>state)
    let {tasks,todolists}=state
let dispatch = useDispatch()
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatusAC(todolistId,taskId,newIsDoneValue))
    }
    const removeTask = (todolistId: string, Id: string) => {
        dispatch(removeTaskAC(todolistId, Id))
    }
    const removeTodoList = (todolistId: string) => {
        dispatch(removeTodoListAC(todolistId))
    }
    const AddTasks = (todolistId: string, title: string) => {
        dispatch(AddTasksAC(todolistId,title))
    }
    const ChangeFilter = (todolistId: string, newfilter: FilterText) => {
        dispatch(ChangeFilterAC(todolistId, newfilter))
    }
    const onChangeItem = (todolistId: string, id: string, newtitle: string) => {
        dispatch(onChangeItemAC(todolistId,id,newtitle))
    }
    const onChangeTitleTodoList = (todolistId: string, newtitle: string) => {
        dispatch(onChangeTitleTodoListAC(todolistId, newtitle))    }

    function AddTodoLists(title: string) {
        const id = v1()
        dispatch(AddTodoListsAC(title,id))
        dispatch(AddTasksIdAC(id))
    }

    return (

        <div className="App">
            <Grid container>
                <ButtonAppBar/>
            </Grid>
            <Container fixed>
                <Grid container>
                    <AddItem AddTodoLists={AddTodoLists} todolistId={v1()}/>
                </Grid>
                <Grid container xs={10} spacing={4}>
                    {todolists.map(el => {
                            let currenttasks = tasks[el.id]
                            if (el.filter === 'Active')
                                currenttasks = tasks[el.id].filter(t => !t.isDone)
                            if (el.filter === 'Completed')
                                currenttasks = tasks[el.id].filter(t => t.isDone)
                            return <Grid  key={el.id} item>
                                <Paper elevation={3}>
                                    <TodoList
                                        // key={el.id}
                                        todolistId={el.id}
                                        removeTask={removeTask}
                                        filter={el.filter}
                                        changeTaskStatus={changeTaskStatus}
                                        ChangeFilter={ChangeFilter}
                                        title={el.title}
                                        tasks={currenttasks}
                                        removeTodoList={removeTodoList}
                                        onChangeTitleTask={onChangeItem}
                                        onChangeTitleTodoList={onChangeTitleTodoList}
                                        AddTasks={AddTasks}
                                    />
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>

            </Container>
        </div>
    );
}

export default App;
