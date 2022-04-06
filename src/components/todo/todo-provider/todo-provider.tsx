import { createContext, Dispatch, SetStateAction, useContext, useState, VFC } from 'react'

export interface Todo {
  id: number
  text: string
  temperature: string
  iconCode: string
  createdDate: string
  createdTime: string
}

export const TodoContext = createContext<Todo[]>([])
export const SetTodosContext = createContext<Dispatch<SetStateAction<Todo[]>>>(() => undefined)

export const useTodoContext = () => useContext(TodoContext)
export const useSetTodosContext = () => useContext(SetTodosContext)

export const WithTodoProvider = (Component: VFC) =>
  function TodoProvider() {
    const [todos, setTodos] = useState<Todo[]>([])

    return (
      <TodoContext.Provider value={todos}>
        <SetTodosContext.Provider value={setTodos}>{<Component />}</SetTodosContext.Provider>
      </TodoContext.Provider>
    )
  }
