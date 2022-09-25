import { API_TODOS_URL } from './config'

export const getTodos = async () => {
   try {
      const response = await fetch(API_TODOS_URL)
      return await response.json()
   } catch (err) {
      console.log('ERROR >', err)
   }
}

export const addTodo = async (data) => {
   const response = await fetch(API_TODOS_URL, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
   })
   return await response.json()
}

export const updateTodo = async (id, data) => {
   const response = await fetch(`${API_TODOS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
   })
   return await response.json()
}

export const removeTodo = async (id) => {
   const response = await fetch(`${API_TODOS_URL}/${id}`, { method: 'DELETE' })
   return response.json()
}