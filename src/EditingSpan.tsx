import React, {ChangeEvent, ChangeEventHandler, useState} from "react";

type EditSpanType = {
    title: string
    onChangeTitleItem: (title:string)=>void

}
export const EditingSpan = (props: EditSpanType) => {
    const [editmode,setEditmode]=useState(true)
    const [item,setItem]=useState('')
    const ShowEditMode = () => {
        setEditmode(false)
        setItem(props.title)
    }
    const HideEditMode = () => {
        setEditmode(true)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setItem(e.currentTarget.value)
        props.onChangeTitleItem(e.currentTarget.value)
    }
    return editmode?
        <span onDoubleClick={ShowEditMode} hidden={!editmode} >{props.title}
    </span>
        :
        <input onBlur={HideEditMode} value={item} onChange={onChangeHandler } autoFocus  hidden={editmode} type="text"/>


}