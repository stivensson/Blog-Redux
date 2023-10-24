import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Alert } from 'antd'

import Header from '../Header'
import ArticlesList from '../ArticlesList'
import SingleArticle from '../../pages/SingleArticle'
import SignUp from '../../pages/SignUp'
import SignIn from '../../pages/SignIn'
import EditProfile from '../../pages/EditProfile'
import NewArticle from '../../pages/NewArticle'
import NotFoundPage from '../../pages/NotFoundPage'
import RequireAuthorization from '../../hoc'
import { useGetUserQuery } from '../../service/blogApi'
import { signInState } from '../../store/reducers/signInSlice'
import {
  ARTICLES,
  ARTICLES_SLUG,
  ARTICLES_SLUG_EDIT,
  NEW_ARTICLE,
  NOT_FOUND,
  PROFILE,
  SIGN_IN,
  SIGN_UP,
} from '../../routes'

import styles from './App.module.scss'

const App = () => {
  const { username } = useSelector((state) => state.signIn)
  const [onLine, setOnLine] = useState(true)
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
      navigator.onLine ? setOnLine(true) : setOnLine(false)
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
        <Route path={ARTICLES} element={<ArticlesList />} />
        <Route path={ARTICLES_SLUG} element={<SingleArticle />} />
        <Route path={SIGN_UP} element={<SignUp />} />
        <Route path={SIGN_IN} element={<SignIn />} />
        <Route
          path={PROFILE}
          element={
            <RequireAuthorization>
              <EditProfile />
            </RequireAuthorization>
          }
        />
        <Route
          path={NEW_ARTICLE}
          element={
            <RequireAuthorization>
              <NewArticle />
            </RequireAuthorization>
          }
        />
        <Route path={ARTICLES_SLUG_EDIT} element={<NewArticle />} />
        <Route path={NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
