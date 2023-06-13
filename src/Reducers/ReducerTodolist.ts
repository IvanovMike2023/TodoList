import {FilterText, TodoListType} from "../App";
import {v1} from "uuid";

export const ReducerTodolist=(state:TodoListType[],action:TsarType):TodoListType[]=>{
    switch (action.type) {
        case 'CHANGE-FILTER':
            return [...state.map(el=>el.id===action.payload.todolistId ? {...el,filter:action.payload.newfilter} : el)]
        case 'REMOVE-TODOLIST':
            return [...state.filter(el=>el.id!==action.payload.todolistId)]
        case 'ONCHANGE-TODOLIST':
            return [...state.map(el=>el.id===action.payload.todolistId ? {...el,title: action.payload.newtitle} : el)]
        case 'ADD-TODOLIST':
            let newtodolist:TodoListType={
                // id:action.payload.id,
                // title: action.payload.title,
                ...action.payload,
                filter: 'All'
            }
            return [...state,newtodolist]
        default: return state
    }
}
type TsarType = ChangeFilterACType | removeTodoListACType | onChangeTitleTodoListACType | AddTodoListsACType
type ChangeFilterACType=ReturnType<typeof ChangeFilterAC>
export const ChangeFilterAC=(todolistId: string, newfilter: FilterText)=>{
    return {
        type: 'CHANGE-FILTER',
        payload:{todolistId, newfilter}
    }as const
}

type removeTodoListACType=ReturnType<typeof removeTodoListAC>
export const removeTodoListAC=(todolistId: string)=>{
    return {
        type: 'REMOVE-TODOLIST',
        payload:{todolistId}
    }as const
}
type onChangeTitleTodoListACType=ReturnType<typeof onChangeTitleTodoListAC>
export const onChangeTitleTodoListAC=(todolistId: string, newtitle: string)=>{
    return {
        type: 'ONCHANGE-TODOLIST',
        payload:{todolistId,newtitle}
    }as const
}
type AddTodoListsACType=ReturnType<typeof AddTodoListsAC>
export const AddTodoListsAC=(title: string,id:string)=>{
    return {
        type: 'ADD-TODOLIST',
        payload:{title,id}
    }as const
}