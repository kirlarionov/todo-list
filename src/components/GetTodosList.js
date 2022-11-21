import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Typography, Box, IconButton } from "@mui/material"
import { Close, Edit } from '@mui/icons-material'
import EditTodoMode from "./EditTodoMode"
import { getTodos, removeTodo, toggleTodo } from "../store/actions"
import { todosDataSelector, todosFetchingSelector } from '../store/selectors'
import Loader from "./Loader"

const TodoBox = styled(Box)`
   position: relative;
   margin-bottom: 15px;
   padding: 5px 15px;
   border-radius: 10px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   background-color: #66e779;
   cursor: pointer;
   &:hover{
      background-color: #30e64b;
      transition: all 0.3s;
   }
`
const BottomTodoBox = styled(Box)`
   display: flex;
   justify-content: space-between;
   padding-top: 7px;
`
const EmptyTodosList = styled(Typography)`
   font-size: 25px;
   text-align: center;
   color: blue;
`
const LoaderBox = styled(Box)`
   position: absolute;
   top: 0px;
   right: 0px;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #6060676e;
   border-radius: 7px;
   z-index: 999;
`

const GetTodosList = () => {
   const dispatch = useDispatch()
   const todos = useSelector(todosDataSelector)
   const loading = useSelector(todosFetchingSelector)
   const [editId, setEditId] = useState(null)
   const [editImputText, setEditImputText] = useState('')

   useEffect(() => dispatch(getTodos()), [dispatch])

   const markDone = useCallback(e => {
      const id = e.currentTarget.dataset.id
      const updatedTodo = todos.find(todo => todo.id === id)
      dispatch(toggleTodo(id, { done: !updatedTodo.done }))
   }, [todos, dispatch])

   const onClickEditTodo = useCallback(e => {
      e.stopPropagation()
      const { id, text } = e.currentTarget.dataset
      setEditId(id)
      setEditImputText(text)
   }, [])

   const delTodo = useCallback(e => {
      e.stopPropagation()
      const id = e.currentTarget.dataset.id
      dispatch(removeTodo(id))
   }, [dispatch])

   return (
      <Box sx={{ position: "relative" }}>
         {!!loading && (
               <LoaderBox>
                  <Loader />
               </LoaderBox>
            )}

         {!todos.length ? <EmptyTodosList>TODOs list is empty...</EmptyTodosList> : (
            todos.map((todo, indx) => {
               return (
                  <TodoBox
                     key={todo.id}
                     data-id={todo.id}
                     sx={todo.done && { backgroundColor: '#d2d2d1', color: '#2f23236e' }}
                     onClick={markDone}
                  >
                     <Box sx={{ width: '87%' }}>
                        <Typography fontSize={18}>
                           <span style={{ fontWeight: '600' }}>
                              {indx + 1}.
                           </span> {todo.text}
                        </Typography>
                        <BottomTodoBox>
                           <Typography>{new Date(todo.createdAt).toLocaleString()}</Typography>
                           <Typography sx={{ fontStyle: 'italic' }}>
                              do on &#10141; <span style={{ fontWeight: '700' }}>{todo.day}</span>
                           </Typography>
                        </BottomTodoBox>
                     </Box>
                     <Box>
                        <IconButton
                           data-id={todo.id}
                           onClick={delTodo}
                        >
                           <Close />
                        </IconButton>
                        <IconButton
                           data-id={todo.id}
                           data-text={todo.text}
                           onClick={onClickEditTodo}
                        >
                           <Edit />
                        </IconButton>
                     </Box>

                     {editId === todo.id && (
                        <EditTodoMode
                           setEditId={setEditId}
                           editId={editId}
                           editImputText={editImputText}
                           setEditImputText={setEditImputText}
                        />
                     )}
                  </TodoBox>
               )
            })
         )}
      </Box>
   )
}

export default GetTodosList