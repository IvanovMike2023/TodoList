import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditingSpan} from "./EditingSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (taskid: string, newIsDone: boolean) => void
    onChangeTitleTask: (id: string, title: string) => void
    removeTask: (id: string) => void
}
const Task = memo(({
                       task,
                       changeTaskStatus,
                       onChangeTitleTask,
                       removeTask
                   }: TaskPropsType) => {
    const SetchangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.taskId, e.currentTarget.checked)
    }
    const setremoveTask = () => {
        removeTask(task.taskId)
    }
    const onChangeTitleTaskItem = (title: string) => {
        onChangeTitleTask(task.taskId, title)
    }
    return (
        <li className={'task-list'} key={task.taskId}>
            <Checkbox onChange={SetchangeTaskStatus} checked={task.isDone}/>
            <div className={task.isDone ? 'title-span-isDone' : ''}>
                <EditingSpan title={task.title} onChangeTitleItem={onChangeTitleTaskItem}/>

            </div>
            <IconButton className={'btn-task-list'} onClick={setremoveTask} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </li>
    )
});

export default Task;