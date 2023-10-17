import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Alert } from 'antd'

import Header from '../Header'
import ArticlesList from '../ArticlesList'
import SingleArticle from '../../pages/SingleArticle'
import SignUp from '../../pages/SignUp'
import SignIn from '../../pages/SignIn'
import EditProfile from '../../pages/EditProfile/'
import { useGetUserQuery } from '../../service/blogApi'
import { signInState } from '../../store/reducers/signInSlice'
import { nowOffLine, nowOnLine } from '../../store/reducers/appSlice'

import styles from './App.module.scss'

const App = () => {
  const { username } = useSelector((state) => state.signIn)
  const { onLine } = useSelector((state) => state.app)
  const [skip, setSkip] = useState(true)
  const dispatch = useDispatch()

  const token = localStorage.getItem('currentUser')

  useEffect(() => {
    if (!username && token) {
      setSkip(false)
    } else {
      setSkip(true)
    }
  }, [username, token])

  const { data, isError } = useGetUserQuery(token, {
    skip,
  })

  useEffect(() => {
    if (!data) return
    dispatch(signInState(data))
  }, [data])

  useEffect(() => {
    const isOnLine = () => {
      navigator.onLine ? dispatch(nowOnLine()) : dispatch(nowOffLine())
    }

    window.addEventListener('online', isOnLine)
    window.addEventListener('offline', isOnLine)

    return () => {
      window.addEventListener('online', isOnLine)
      window.addEventListener('offline', isOnLine)
    }
  })

  return (
    <>
      {!onLine ? (
        <Alert
          className={styles['app-error']}
          type="error"
          closable
          message="Внимание, ошибка соединения!"
          description="- проверьте интернет соединение или перезагрузите страницу."
        />
      ) : isError ? (
        <Alert
          className={styles['app-error-sign']}
          type="warning"
          message="Что-то пошло не так, авторизируйтесь заного!"
          closable
        />
      ) : null}
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<SingleArticle />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<EditProfile />} />
      </Routes>
    </>
  )
}

export default App
