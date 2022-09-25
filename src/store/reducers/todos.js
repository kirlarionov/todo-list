import {
   GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE,
   ADD_TODOS_REQUEST, ADD_TODOS_SUCCESS, ADD_TODOS_FAILURE,
   REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS, REMOVE_TODO_FAILURE,
   EDIT_TODO_REQUEST, EDIT_TODO_SUCCESS, EDIT_TODO_FAILURE,
   TOGGLE_TODO_REQUEST, TOGGLE_TODO_SUCCESS, TOGGLE_TODO_FAILURE
} from '../types'

const initialState = {
   fetching: false,
   data: [],
   error: null
}

export const todosReducer = (state = initialState, { type, payload }) => {
   switch (type) {

      //                              GET
      case GET_TODOS_REQUEST:
         return {
            ...state,
            fetching: true
         }
      case GET_TODOS_SUCCESS:
         return {
            ...state,
            fetching: false,
            data: payload
         }
      case GET_TODOS_FAILURE:
         return {
            ...state,
            error: payload
         }

      //                             ADD
      case ADD_TODOS_REQUEST:
         return {
            ...state,
            fetching: true
         }
      case ADD_TODOS_SUCCESS:
         return {
            ...state,
            fetching: false,
            data: [
               ...state.data,
               payload
            ]
         }
      case ADD_TODOS_FAILURE:
         return {
            ...state,
            error: payload
         }

      //                            REMOVE
      case REMOVE_TODO_REQUEST:
         return {
            ...state,
            fetching: true
         }
      case REMOVE_TODO_SUCCESS:
         const filterState = state.data.filter(todo => todo.id !== payload)
         return {
            ...state,
            fetching: false,
            data: [
               ...filterState
            ]
         }
      case REMOVE_TODO_FAILURE:
         return {
            ...state,
            error: payload
         }

      //                            EDIT
      case EDIT_TODO_REQUEST:
         return {
            ...state,
            fetching: true
         }
      case EDIT_TODO_SUCCESS:
         const { id, ...data } = payload
         const updatedState = state.data.map(todo => todo.id === id ? { ...todo, ...data } : todo)
         return {
            ...state,
            fetching: false,
            data: [
               ...updatedState
            ]
         }
      case EDIT_TODO_FAILURE:
         return {
            ...state,
            error: payload
         }
      //                         TOGGLE
      case TOGGLE_TODO_REQUEST:
         return {
            ...state,
            fetching: true
         }
      case TOGGLE_TODO_SUCCESS:
         const toggleTodoState = state.data.map(todo => todo.id ===  payload.id ? { ...todo, done: payload.done } : todo)
         return {
            ...state,
            fetching: false,
            data: [
               ...toggleTodoState
            ]
         }
      case TOGGLE_TODO_FAILURE:
         return {
            ...state,
            error: payload
         }
      default:
         return state
   }
}