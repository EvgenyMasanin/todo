import { ChangeEventHandler, FormEventHandler, useState, VFC } from 'react'
import { useSetTodosContext } from 'components/todo/todo-provider'
import { getDateString, getTimeString } from 'services/date.service'
import { getCurrentWeather } from 'services/weather.service'
import s from './todo-form.module.css'

export interface TodoForm {
  maxLength?: number
}

export const TodoForm: VFC<TodoForm> = ({ maxLength }) => {
  const setTodos = useSetTodosContext()

  const [todoText, setTodoText] = useState('')

  const [validationError, setValidationError] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setTodoText(value)

    if (!maxLength) return
    if (value.length > maxLength) {
      setValidationError(`Max length is ${maxLength} characters!`)
    }
    if (validationError && value.length <= maxLength) {
      setValidationError('')
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!todoText) return

    const { weather, error } = await getCurrentWeather()

    if (error || !weather) return alert(error?.message)

    setTodos((todos) => [
      ...todos,
      {
        id: Date.now(),
        createdDate: getDateString(),
        createdTime: getTimeString(),
        iconCode: weather?.iconCode,
        temperature: weather?.temperature,
        text: todoText,
      },
    ])

    setTodoText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.inputContainer}>
        <label htmlFor="todo">Add note...</label>
        <input
          id="todo"
          className={`${s.input} ${validationError && s.invalid}`}
          type="text"
          value={todoText}
          onChange={handleChange}
        />
        <div className={s.error}>{validationError}</div>
      </div>
      <button style={{ display: 'none' }}></button>
    </form>
  )
}
