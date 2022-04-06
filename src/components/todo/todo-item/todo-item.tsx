import { FC } from 'react'
import { getWeatherIconUrl } from 'services/weather.service'
import { Todo, useSetTodosContext } from '../todo-provider'
import s from './todo-item.module.css'

export interface TodoItemProps {
  todo: Todo
}

export const TodoItem: FC<TodoItemProps> = ({
  todo: { id, text, createdDate, createdTime, iconCode, temperature },
}) => {
  const setTodos = useSetTodosContext()

  const handleDelete = () => {
    setTodos((todos) => todos.filter((t) => t.id !== id))
  }

  return (
    <li className={s.todoItem}>
      <div className={s.content}>
        <p className={s.text}>{text}</p>
        <div className={s.info}>
          <img className={s.icon} src={getWeatherIconUrl(iconCode)} alt="q" />
          <span>{temperature}</span>
          <span>{createdDate}</span>
          <span>{createdTime}</span>
        </div>
      </div>
      <button type="button" className={s.delete} onClick={handleDelete}>
        &#10006;
      </button>
    </li>
  )
}
