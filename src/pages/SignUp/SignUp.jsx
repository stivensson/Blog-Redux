import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { useSignUpMutation } from '../../service/blogApi'
import { SIGN_IN } from '../../routes'

import styles from './SignUp.module.scss'

const SignUp = () => {
  const navigation = useNavigate()

  const spinIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />

  const [signUp, { data, isError, error, isLoading }] = useSignUpMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (user) => {
    delete user.repeatPassword
    delete user.agreement
    const body = JSON.stringify({ user })
    signUp(body)
  }

  useEffect(() => {
    if (!data) return
    localStorage.setItem('blogPlatforma', data.user.token)
    navigation(SIGN_IN)
  }, [data])

  return (
    <>
      {isLoading && <Spin className={styles.spin} indicator={spinIcon} />}
      {isError && error.data.errors.username ? (
        <Alert
          className={styles['alert-user']}
          type="warning"
          message="Пользователь с таким именем уже существует!"
          closable
        />
      ) : isError && error.data.errors.email ? (
        <Alert
          className={styles['alert-email']}
          type="warning"
          message="Пользователь с такой почтой уже существует!"
          closable
        />
      ) : null}
      <div className={styles['create-user']}>
        <form className={styles['create-user-form']} onSubmit={handleSubmit(onSubmit)}>
          <span className={styles['form-title']}>Create new account</span>
          <div className={styles['form-label']}>
            <label className={styles['form-username']}>
              <span>Username</span>
              <input
                placeholder="Username"
                autoFocus
                {...register('username', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 3,
                    message: 'Минимум 3 символа',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Максимум 20 символов',
                  },
                  pattern: {
                    value: /^[^\s]*$/,
                    message: 'Пробел - недопустимый символ',
                  },
                })}
              />
              {errors.username && (
                <span style={{ color: 'red', fontSize: 12, top: 290, position: 'absolute' }}>
                  {errors.username.message}
                </span>
              )}
            </label>
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
                <span style={{ color: 'red', fontSize: 12, top: 369, position: 'absolute' }}>
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
                <span style={{ color: 'red', fontSize: 12, top: 446, position: 'absolute' }}>
                  {errors.password.message}
                </span>
              )}
            </label>
            <label className={styles['form-repeat-password']}>
              <span>Repeat Password</span>
              <input
                placeholder="Password"
                type="password"
                {...register('repeatPassword', {
                  required: 'Поле обязательно к заполнению',
                  validate: (value) => value === watch('password') || 'Пароли не совпадают',
                })}
              />
              {errors.repeatPassword && (
                <span style={{ color: 'red', fontSize: 12, top: 524, position: 'absolute' }}>
                  {errors.repeatPassword.message}
                </span>
              )}
            </label>
            <label className={styles['form-agreement']}>
              <input
                type="checkbox"
                {...register('agreement', {
                  required: 'Не принято соглашение',
                })}
              />
              <span>I agree to the processing of my personal information</span>
              {errors.agreement && (
                <span style={{ color: 'red', fontSize: 12, top: 594, position: 'absolute' }}>
                  {errors.agreement.message}
                </span>
              )}
            </label>
          </div>
          <input className={styles['form-button']} type="submit" value="Create" />
          <span className={styles['form-sign-in']}>
            Already have an account?
            <Link to={SIGN_IN}>
              <span>Sign In.</span>
            </Link>
          </span>
        </form>
      </div>
    </>
  )
}

export default SignUp
