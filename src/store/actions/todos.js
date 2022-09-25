import {
   GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE,
   ADD_TODOS_REQUEST, ADD_TODOS_SUCCESS, ADD_TODOS_FAILURE,
   REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS, REMOVE_TODO_FAILURE,
   EDIT_TODO_REQUEST, EDIT_TODO_SUCCESS, EDIT_TODO_FAILURE,
   TOGGLE_TODO_REQUEST, TOGGLE_TODO_SUCCESS, TOGGLE_TODO_FAILURE
} from '../types'
import {
   getTodos as fetchGetTodos, addTodo as fetchAddTodo,
   removeTodo as fetchRemoveTodo, updateTodo as fetchUpdateTodo
} from '../../services'

export const getTodos = () => {
   return (dispatch) => {
      dispatch(getTodosRequest())
      fetchGetTodos()
         .then(data => dispatch(getTodosSuccess(data)))
         .catch(err => dispatch(getTodosFailure(err)))
   }
}

const getTodosRequest = () => ({
   type: GET_TODOS_REQUEST,
})

const getTodosSuccess = (payload) => ({
   type: GET_TODOS_SUCCESS,
   payload
})

const getTodosFailure = (payload) => ({
   type: GET_TODOS_FAILURE,
   payload
})

export const addTodo = (data) => {
   return (dispatch) => {
      dispatch(addTodoRequest())
      fetchAddTodo(data)
         .then(data => dispatch(addTodoSucsess(data)))
         .catch(err => dispatch(addTodoFailure(err)))
   }
}

const addTodoRequest = () => ({
   type: ADD_TODOS_REQUEST,
})

const addTodoSucsess = (payload) => ({
   type: ADD_TODOS_SUCCESS,
   payload
})

const addTodoFailure = (payload) => ({
   type: ADD_TODOS_FAILURE,
   payload
})

export const removeTodo = (id) => {
   return (dispatch) => {
      dispatch(removeTodoRequest())
      fetchRemoveTodo(id)
         .then(() => dispatch(removeTodoSucsess(id)))
         .catch(err => dispatch(removeTodoFailure(err)))
   }
}

const removeTodoRequest = () => ({
   type: REMOVE_TODO_REQUEST,
})

const removeTodoSucsess = (payload) => ({
   type: REMOVE_TODO_SUCCESS,
   payload
})

const removeTodoFailure = (payload) => ({
   type: REMOVE_TODO_FAILURE,
   payload
})

export const updateTodo = (id, data) => {
   return (dispatch) => {
      dispatch(updateTodoRequest())
      fetchUpdateTodo(id, data)
         .then(dispatch(updateTodoSucsess({ id, ...data })))
         .catch(err => dispatch(updateTodoFailure(err)))
   }
}

const updateTodoRequest = () => ({
   type: EDIT_TODO_REQUEST,
})

const updateTodoSucsess = (payload) => ({
   type: EDIT_TODO_SUCCESS,
   payload
})

const updateTodoFailure = (payload) => ({
   type: EDIT_TODO_FAILURE,
   payload
})

export const toggleTodo = (id, data) => {
   return (dispatch) => {
      dispatch(toggleTodoRequest())
      fetchUpdateTodo(id, data )
         .then(dispatch(toggleTodoSucsess({ id, ...data })))
         .catch(err => dispatch(toggleTodoFailure(err)))
   }
}

const toggleTodoRequest = () => ({
   type: TOGGLE_TODO_REQUEST,
})

const toggleTodoSucsess = (payload) => ({
   type: TOGGLE_TODO_SUCCESS,
   payload
})

const toggleTodoFailure = (payload) => ({
   type: TOGGLE_TODO_FAILURE,
   payload
})

