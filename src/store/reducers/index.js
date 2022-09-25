import { combineReducers } from 'redux'
import { todosReducer } from './todos'

export const rootReducer = combineReducers({ todos: todosReducer })