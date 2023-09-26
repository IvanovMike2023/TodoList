import React, {useCallback, useReducer, useState} from 'react';
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
import {AppRootStateType} from "./store/store";
import {log} from "util";

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
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatusAC(todolistId,taskId,newIsDoneValue))
    },[dispatch])
    const removeTask = useCallback((todolistId: string, Id: string) => {
        dispatch(removeTaskAC(todolistId, Id))
    },[dispatch])
    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodoListAC(todolistId))
    },[dispatch])
    const AddTasks = useCallback((todolistId: string, title: string) => {
        dispatch(AddTasksAC(todolistId,title))
    },[dispatch])
    const ChangeFilter = useCallback((todolistId: string, newfilter: FilterText) => {
        dispatch(ChangeFilterAC(todolistId, newfilter))
    },[dispatch])
    const onChangeItem = useCallback((todolistId: string, id: string, newtitle: string) => {
        dispatch(onChangeItemAC(todolistId,id,newtitle))
    },[dispatch])
    const onChangeTitleTodoList =useCallback( (todolistId: string, newtitle: string) => {
        dispatch(onChangeTitleTodoListAC(todolistId, newtitle))    },[dispatch])

    const AddTodoLists=useCallback((title: string)=> {
        dispatch(AddTodoListsAC(title))
        //dispatch(AddTasksIdAC(id))
    },[])

    return (

        <div className="App">
            <Grid container>
                <ButtonAppBar/>
            </Grid>
            <Container fixed>
                <Grid container>
                    <AddItem AddTodoLists={AddTodoLists} />
                </Grid>
                <Grid container  spacing={4}>
                    {todolists.map(el => {

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
                                        tasks={tasks[el.id]}
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
