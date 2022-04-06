import { VFC } from 'react'
import Todo from 'components/todo'
import s from './app.module.css'

export const App: VFC = () => {
  return (
    <div className={s.app}>
      <Todo />
    </div>
  )
}
