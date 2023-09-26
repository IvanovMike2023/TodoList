import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {Button} from "@mui/material";
import TextField from '@mui/material/TextField';
type AddItemType = {
    AddTodoLists: (title: string) => void
}

export const AddItem = memo((props: AddItemType) => {
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        settitleTasks(e.currentTarget.value)
        setError('')
    }
    const [titleTasks, settitleTasks] = useState('')
    const [error, setError] = useState<string | null>('')
    const titleMaxLength = 15
    const addTaskonKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && !isAddBtnDisabled && addTaskHandler()
    }
    const isTitleLengthTooLong: boolean = titleTasks.length > titleMaxLength
    const isAddBtnDisabled: boolean = !titleTasks.length || titleTasks.length > titleMaxLength
    const addTaskHandler = () => {
        const trimmedtitle = titleTasks.trim()
        if (trimmedtitle) {
            props.AddTodoLists(titleTasks)
        } else {
            setError('asasass')
        }
        settitleTasks('')
    }
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: 'red'}}>Title is to long</div>
        : null
    const usermessage = error ?
        <div style={{color: 'red'}}>Title is strong reqwired</div>
        : null
    const buttonStyles={
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        backgroundColor:'red'
    }

    return <div>

        <TextField
            error={!!error}
            size={"small"}
            id="filled-basic"
            label={error ? 'Title is reqired' : 'please type smth...'}
            variant="outlined"
            onChange={setTitleHandler}
            value={titleTasks}
            onKeyDown={addTaskonKeyHandler}
                    />


        <Button style={buttonStyles} disabled={isAddBtnDisabled} onClick={addTaskHandler}>+</Button>
        {titleMaxLengthWarning || usermessage}

    </div>
})