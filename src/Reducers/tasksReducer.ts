import {AssocTaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListsACType} from "./todolistsReducer";

let initState:AssocTaskType={}
export const tasksReducer = (state=initState, action: TsarType): AssocTaskType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.taskId != action.payload.Id)
            }
        case 'CHANGE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.taskId === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.newIsDoneValue
                } : el)
            }
        case 'ADD-TASK':
            let newtask = {
                taskId: v1(),
                title: action.payload.title,
                isDone: true
            }
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newtask]}
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.payload.id] = [];
            return stateCopy;
        }
        case 'ONCHANGE-ITEM':
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].map(el=>el.taskId===action.payload.id ? {...el,title: action.payload.newtitle}: el )}
        default:
            return state
    }
}
type TsarType = removeTaskACType | changeTaskStatusACType | AddTasksACType |AddTasksIdACType | onChangeItemACType | AddTodoListsACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, Id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, Id}
    } as const
}
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
    return {
        type: 'CHANGE-TASK',
        payload: {todolistId, taskId, newIsDoneValue}
    } as const
}
type AddTasksACType = ReturnType<typeof AddTasksAC>
export const AddTasksAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, title}
    } as const
}
type AddTasksIdACType = ReturnType<typeof AddTasksIdAC>
export const AddTasksIdAC = (id: string) => {
    return {
        type: 'ADD-TASKID',
        payload: {id}
    } as const
}
type onChangeItemACType = ReturnType<typeof onChangeItemAC>
export const onChangeItemAC = (todolistId: string, id: string, newtitle: string) => {
    return {
        type: 'ONCHANGE-ITEM',
        payload: {todolistId,id,newtitle}
    } as const
}