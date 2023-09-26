import React, {ChangeEvent, FC, memo, useCallback} from "react";
import {FilterText} from "./App";
import {AddItem} from "./AddItem";
import {EditingSpan} from "./EditingSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox'
import Task from "./Task";
import TaskWithReduax from "./TaskWithReduax";
import {useSelector} from "react-redux";

export type TaskType = {
    taskId: string,
    title: string,
    isDone: boolean
}

export interface TodoPropsType {
    title: string
    tasks: TaskType[]
    todolistId: string
    filter: string
    removeTodoList: (todolistId: string) => void
    ChangeFilter: (todolistId: string, name: FilterText) => void
    AddTasks: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskid: string, newIsDone: boolean) => void
    removeTask: (todolistId: string, id: string) => void
    onChangeTitleTask: (todolistId: string, id: string, title: string) => void
    onChangeTitleTodoList: (todolistId: string, title: string) => void
}

const TodoList = memo((props: TodoPropsType) => {
    let tasks = props.tasks
    if (props.filter === 'Active')
        tasks = props.tasks.filter(t => !t.isDone)
    if (props.filter === 'Completed')
        tasks = props.tasks.filter(t => t.isDone)


    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean) => {
        props.changeTaskStatus(props.todolistId, taskId, newIsDone)
    }, [])
    const removeTask = useCallback((taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }, [])
    const onChangeTitleTask = useCallback((taskId: string, title: string) => {
        props.onChangeTitleTask(props.todolistId, taskId, title)
    }, [])
    const TasksJSX: Array<JSX.Element> = tasks.map((m: TaskType) => {

        return (
            <TaskWithReduax key={m.taskId} task={m} todolistId={props.todolistId}/>
            // <Task key={m.taskId}
            //     task={m}
            //     changeTaskStatus={changeTaskStatus}
            //     onChangeTitleTask={onChangeTitleTask}
            //     removeTask={removeTask}
            // />
        )

    })
    const handlerCreator = (todolistId: string, filter: FilterText) => () => {
        props.ChangeFilter(todolistId, filter)
    }
    const removeTodoListHandler = () => {
        props.removeTodoList(props.todolistId)
    }
    const AddTodoLists = useCallback((title: string) => {
        props.AddTasks(props.todolistId, title)
    }, [props.AddTasks, props.todolistId])
    const onChangeTitleTodoList = useCallback((title: string) => {
        props.onChangeTitleTodoList(props.todolistId, title)
    },[props.onChangeTitleTodoList,props.todolistId])
    return (
        <div className="todolist">
            <h3 className={'title-todolist'}>
                <EditingSpan title={props.title} onChangeTitleItem={onChangeTitleTodoList}/>
                <IconButton onClick={removeTodoListHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItem AddTodoLists={AddTodoLists}/>
            <ul>
                {TasksJSX}
            </ul>
            <div className={'filter-btn-wrapper'}>
                <Button color={"primary"}
                        onClick={handlerCreator(props.todolistId, 'All')}
                        variant={props.filter === 'All' ? 'contained' : 'contained'}>All</Button>
                <Button color={"success"} onClick={handlerCreator(props.todolistId, 'Active')}
                        variant={props.filter === 'Active' ? 'contained' : 'contained'}>Active</Button>

                <Button color={'error'} onClick={handlerCreator(props.todolistId, 'Completed')}
                        variant={props.filter === 'Completed' ? 'contained' : 'contained'}>Completed</Button>

            </div>
        </div>
    )
})
export default TodoList


