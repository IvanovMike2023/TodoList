import React, {ChangeEvent, FC, memo} from "react";
import {FilterText} from "./App";
import {AddItem} from "./AddItem";
import {EditingSpan} from "./EditingSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AssocTaskType, TodoListType} from "./AppWithRedux";
import todoList from "./TodoList";
import {AddTasksAC, changeTaskStatusAC, onChangeItemAC, removeTaskAC} from "./Reducers/ReducerTask";
import {ChangeFilterAC, onChangeTitleTodoListAC, removeTodoListAC} from "./Reducers/ReducerTodolist";
export type TaskType = {
    taskId: string,
    title: string,
    isDone: boolean
}

export interface TodoPropsType {

    todolist: TodoListType

}

const TodoListWithRedux= memo(({todolist}: TodoPropsType) => {

    const {id,filter,title}=todolist
    let tasks = useSelector<AppRootStateType,TaskType[]>(state=>state.tasks[id])
    const dispatch = useDispatch()

    if (filter === 'Active')
        tasks = tasks.filter(t => !t.isDone)
    if (filter === 'Completed')
        tasks = tasks.filter(t => t.isDone)


    const TasksJSX: Array<JSX.Element> = tasks.map((m: TaskType) => {

        const SetchangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(id,m.taskId,e.currentTarget.checked))
            //props.changeTaskStatus(props.todolistId, m.taskId, e.currentTarget.checked)
        }
        const setremoveTask = () => {
            dispatch(removeTaskAC(id,m.taskId))
            //props.removeTask(props.todolistId, m.taskId)
        }
        const onChangeTitleTaskItem = (title: string) => {
            dispatch(onChangeItemAC(id,m.taskId,title))
            //props.onChangeTitleTask(props.todolistId, m.taskId, title)

        }


        return (
            <li className={'task-list'} key={m.taskId}>
                <Checkbox onChange={SetchangeTaskStatus} checked={m.isDone}  />
                <div className={m.isDone ? 'title-span-isDone' : ''}>
                    <EditingSpan title={m.title} onChangeTitleItem={onChangeTitleTaskItem}/>

                </div>
                <IconButton className={'btn-task-list'} onClick={setremoveTask} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </li>
        )
    })
    const handlerCreator = (todolistId: string, filter: FilterText) => () => {
        dispatch(ChangeFilterAC(id,filter))
        //props.ChangeFilter(todolistId, filter)
    }
    const removeTodoListHandler = () => {
        dispatch(removeTodoListAC(id))
        //props.removeTodoList(props.todolistId)
    }
    const AddTodoLists = (title: string) => {
        dispatch(AddTasksAC(id,title))
        //props.AddTasks(props.todolistId, title)
    }
    const onChangeTitleTodoList = (title: string) => {
        dispatch(onChangeTitleTodoListAC(id,title))
        //props.onChangeTitleTodoList(props.todolistId, title)

    }
    return (
        <div className="todolist">
            <h3 className={'title-todolist'}>
                <EditingSpan title={title} onChangeTitleItem={onChangeTitleTodoList}/>
                <IconButton onClick={removeTodoListHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItem AddTodoLists={AddTodoLists} todolistId={id}/>
            <ul>
                {TasksJSX}
            </ul>
            <div className={'filter-btn-wrapper'}>
                <Button color={"primary"}
                        onClick={handlerCreator(id, 'All')}
                        variant={filter === 'All' ? 'contained' : 'contained'}>All</Button>
                <Button color={"success"} onClick={handlerCreator(id, 'Active')}
                        variant={filter === 'Active' ? 'contained' : 'contained'}>Active</Button>

                <Button color={'error'} onClick={handlerCreator(id, 'Completed')}
                        variant={filter === 'Completed' ? 'contained' : 'contained'}>Completed</Button>

            </div>
        </div>
    )
})
export default TodoListWithRedux


