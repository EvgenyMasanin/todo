import { FC } from 'react'
import { TodoForm } from '../forms/todo-form'
import { useTodoContext, WithTodoProvider } from './todo-provider'
import { TodoItem } from './todo-item'
import s from './todo.module.css'

const Todo: FC = () => {
  const todos = useTodoContext()

  const isTodosEmpty = todos.length === 0

  return (
    <div className={s.todoContainer}>
      <ol className={s.todoList}>
        {isTodosEmpty ? (
          <span className={s.placeholder}>Add some todo...</span>
        ) : (
          todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />
          })
        )}
      </ol>
      <TodoForm maxLength={300} />
    </div>
  )
}

export default WithTodoProvider(Todo)
