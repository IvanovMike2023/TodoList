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
    ReducerTask,
    removeTaskAC
} from "./Reducers/ReducerTask";
import {
    AddTodoListsAC,
    ChangeFilterAC,
    onChangeTitleTodoListAC,
    ReducerTodolist,
    removeTodoListAC
} from "./Reducers/ReducerTodolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodoListWithRedux from "./TodoListWithRedux";

export type TodoListType = {
    id: string
    title: string
    filter: FilterText
}
export type AssocTaskType = {
    [key: string]: TaskType[]
}
export type FilterText = 'All' | 'Completed' | 'Active'

function AppWithRedux() {
const todolists = useSelector<AppRootStateType,Array<TodoListType>>(state=>state.todolists)

    const dispatch= useDispatch()
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
                            return <Grid  key={el.id} item>
                                <Paper elevation={3}>
                                    <TodoListWithRedux
                                        todolist={el}
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

export default AppWithRedux;
