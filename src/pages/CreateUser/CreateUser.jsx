import React from 'react'
import { useForm } from 'react-hook-form'

import { useGetTokenMutation } from '../../service/blogApi'

import styles from './CreateUser.module.scss'

const CreateUser = () => {
  const [getToken, { data, error }] = useGetTokenMutation()
  // const handleGetToken = async (tip) => {
  //   console.log(tip)
  //   await getToken(tip).unwrap()
  // }

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
    console.log(JSON.stringify({ user }))
    const body = JSON.stringify({ user })
    console.log(body)
    getToken(body)
  }
  console.log(error)
  console.log(data)

  return (
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
            {errors?.username && (
              <span style={{ color: 'red', fontSize: 12, top: 295, position: 'absolute' }}>
                {errors?.username?.message}
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
              <span style={{ color: 'red', fontSize: 12, top: 375, position: 'absolute' }}>{errors.email.message}</span>
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
              <span style={{ color: 'red', fontSize: 12, top: 455, position: 'absolute' }}>
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
              <span style={{ color: 'red', fontSize: 12, top: 535, position: 'absolute' }}>
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
              <span style={{ color: 'red', fontSize: 12, top: 605, position: 'absolute' }}>
                {errors.agreement.message}
              </span>
            )}
          </label>
        </div>
        <input className={styles['form-button']} type="submit" value="Create" />
        <span className={styles['form-sign-in']}>
          Already have an account? <span>Sign In.</span>
        </span>
      </form>
    </div>
  )
}

export default CreateUser
