import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import {
   Button, Box, TextField, Switch, FormControl,
   FormControlLabel, Select, MenuItem, InputLabel
} from "@mui/material"
import { addTodo } from "../store/actions"

const FormContainer = styled(Box)`
   margin-bottom: 25px;
   display: flex; 
   align-items: center; 
   justify-content: space-between;
`
const TodoInput = styled(TextField)`
   width: 500px;  
   background-color: white;
`
const SelectBox = styled(FormControl)`
   padding-bottom: 16px;
   min-width: 100px; 
   margin-right: 16; 
   border: 2px solid #f4f46; 
`

const AddTodosForm = () => {
   const dispatch = useDispatch()
   const [todoText, setTodoText] = useState('')
   const [todoDay, setTodoDay] = useState('')
   const [emptyImput, setEmptyInput] = useState(false)
   const [emptyDay, setEmptyDay] = useState(false)

   const handleChangeTodoText = event => setTodoText(event.target.value)
   const handleChangeTodoDay = event => setTodoDay(event.target.value)

   const submitHandler = useCallback(event => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const { done, ...data } = Object.fromEntries(formData)
      if (!!todoText) {
         if (!todoDay) return setEmptyDay(true)
         else return (
            dispatch(addTodo({ ...data, done: done === 'done' })),
            setTodoText(''),
            setEmptyInput(false),
            setEmptyDay(false)
         )
      } else setEmptyInput(true)
   }, [todoText, todoDay, dispatch])

   const inputFocus = useCallback(() => setEmptyInput(false), [])
   const selectFocus = useCallback(() => setEmptyDay(false), [])

   return (
      <FormContainer
         component='form'
         variant="filled"
         onSubmit={submitHandler}
         noValidate
         autoComplete="off"
      >
         <TodoInput
            name="text"
            value={todoText}
            onChange={handleChangeTodoText}
            onFocus={inputFocus}
            label="add TODO"
            id="outlined-helperText"
            size="small"
            sx={emptyImput && { backgroundColor: 'red', borderRadius: '5px' }}
         />
         <FormControlLabel
            name='done'
            value="done"
            control={<Switch color="primary" />}
            label="Mark as done:"
            labelPlacement="top"
            sx={{ marginRight: '5px' }}
         />

         <SelectBox variant="standard" sx={emptyDay && { borderColor: 'red' }}>
            <InputLabel id="demo-simple-select-standard-label">Weeks day</InputLabel>
            <Select
               name="day"
               labelId="demo-simple-select-standard-label"
               id="demo-simple-select-standard"
               label="Weeks day"
               value={todoDay}
               onChange={handleChangeTodoDay}
               onFocus={selectFocus}
            >
               <MenuItem value="Sunday">Sunday</MenuItem>
               <MenuItem value="Monday">Monday</MenuItem>
               <MenuItem value="Tuesday">Tuesday</MenuItem>
               <MenuItem value="Wednesday">Wednesday</MenuItem>
               <MenuItem value="Thursday">Thursday</MenuItem>
               <MenuItem value="Friday">Friday</MenuItem>
               <MenuItem value="Saturday">Saturday</MenuItem>
            </Select>
         </SelectBox>

         <Button variant="contained" type="submit">ADD</Button>
      </FormContainer>
   )
}

export default AddTodosForm