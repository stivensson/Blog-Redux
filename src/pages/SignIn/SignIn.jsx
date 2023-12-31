import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Alert, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { useSignInMutation } from '../../service/blogApi'
import { signInState } from '../../store/reducers/signInSlice'
import { SIGN_UP } from '../../routes'

import styles from './SignIn.module.scss'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const location = useLocation()

  const spinIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />

  const fromPage = location.state?.from?.pathname || '/articles'

  const [signIn, { data, isError, error, isLoading }] = useSignInMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const onSubmit = (user) => {
    const body = JSON.stringify({ user })
    signIn(body)
  }

  useEffect(() => {
    if (!data) return
    dispatch(signInState(data))
    localStorage.setItem('currentUser', data.user.token)
    navigation(fromPage, { replace: true })
  }, [data])

  return (
    <>
      {isLoading && <Spin className={styles.spin} indicator={spinIcon} />}
      {isError && error.status === 422 ? (
        <Alert className={styles['alert-sign-in']} type="warning" message="Почта или пароль не верны!" closable />
      ) : isError ? (
        <Alert
          className={styles['edit-profile-error']}
          type="warning"
          message="Что-то пошло не так, попробуйте снова!"
          closable
        />
      ) : null}
      <div className={styles['sign-in']}>
        <form className={styles['sign-in-form']} onSubmit={handleSubmit(onSubmit)}>
          <span className={styles['form-title']}>Sign In</span>
          <div className={styles['form-label']}>
            <label className={styles['form-email']}>
              <span>Email address</span>
              <input
                placeholder="Email address"
                type="email"
                {...register('email', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 6,
                    message: 'Минимум 6 символа',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Максимум 40 символов',
                  },
                  pattern: {
                    value: /^[^\s]*$/,
                    message: 'Пробел - недопустимый символ',
                  },
                })}
              />
              {errors.email && (
                <span style={{ color: 'red', fontSize: 12, top: 290, position: 'absolute' }}>
                  {errors.email.message}
                </span>
              )}
            </label>
            <label className={styles['form-password']}>
              <span>Password</span>
              <input
                placeholder="Password"
                type="password"
                {...register('password', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 6,
                    message: 'Минимум 6 символа',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Максимум 40 символов',
                  },
                  pattern: {
                    value: /^[^\s]*$/,
                    message: 'Пробел - недопустимый символ',
                  },
                })}
              />
              {errors.password && (
                <span style={{ color: 'red', fontSize: 12, top: 369, position: 'absolute' }}>
                  {errors.password.message}
                </span>
              )}
            </label>
          </div>
          <input className={styles['form-button']} type="submit" value="Login" />
          <span className={styles['form-sign-up']}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?
            <Link to={SIGN_UP}>
              <span>Sign Up.</span>
            </Link>
          </span>
        </form>
      </div>
    </>
  )
}

export default SignIn
