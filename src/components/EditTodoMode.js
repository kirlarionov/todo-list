import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, TextField, Button } from "@mui/material"
import { updateTodo } from "../store/actions"

const EditBlock = styled(Box)`
   position: absolute;
   left: 35px;
   top: 10px;
`
const EditInput = styled(TextField)`
   position: relative;
   border-radius: 5px;
   background-color: white;
   width: 600px;
`
const EditButtonBox = styled(Box)`
   position: absolute;
   top: 37px;
   right: 0px;
   z-index: 999;
`

const EditTodoMode = ({ setEditId, editId, editImputText, setEditImputText }) => {
   const dispatch = useDispatch()

   const handleEditText = useCallback(event => setEditImputText(event.target.value), [setEditImputText])

   const submitEditHandler = useCallback(event => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const data = Object.fromEntries(formData)
      dispatch(updateTodo(editId, data))
      setEditId(null)
   }, [setEditId, editId, dispatch])

   const onCancelEdit = useCallback(() => {
      setEditId(null)
      setEditImputText('')
   }, [setEditImputText, setEditId])


   return (
      <EditBlock
         component='form'
         onSubmit={submitEditHandler}
         noValidate
         autoComplete="off"
         onClick={e => e.stopPropagation()}
      >
         <EditInput
            name='text'
            value={editImputText}
            onChange={handleEditText}
            size="small"
         />
         <EditButtonBox>
            <Button type="submit" variant="contained">Apply</Button>
            <Button variant="text" onClick={onCancelEdit}>Cancel</Button>
         </EditButtonBox>
      </EditBlock>
   )
}

export default EditTodoMode