import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditingSpan} from "./EditingSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodoList";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, onChangeItemAC, removeTaskAC} from "./Reducers/tasksReducer";
import {AppRootStateType} from "./store/store";

export  type TaskWithReduaxType = {
    task: TaskType
    todolistId: string
}

const TaskWithReduax = ({
                            task,
                            todolistId
                        }: TaskWithReduaxType) => {
    const dispatch = useDispatch()
    const SetchangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, task.taskId, e.currentTarget.checked))
    }
    const setremoveTask = () => {
        dispatch(removeTaskAC(todolistId, task.taskId))
    }
    const onChangeTitleTaskItem =useCallback ((title: string) => {
        dispatch(onChangeItemAC(todolistId, task.taskId, title))
    },[dispatch])
    const t = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId].filter(t => t.taskId === task.taskId)[0])
    return (
        <div>
            <li className={'task-list'} key={task.taskId}>
                <Checkbox onChange={SetchangeTaskStatus} checked={task.isDone}/>
                <div className={task.isDone ? 'title-span-isDone' : ''}>
                    <EditingSpan title={task.title} onChangeTitleItem={onChangeTitleTaskItem}/>

                </div>
                <IconButton className={'btn-task-list'} onClick={setremoveTask} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </li>
        </div>
    );
};

export default TaskWithReduax;