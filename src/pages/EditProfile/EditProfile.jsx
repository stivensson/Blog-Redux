import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Alert, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { useEditProfileMutation } from '../../service/blogApi'
import { signInState } from '../../store/reducers/signInSlice'

import styles from './EditProfile.module.scss'

const EditProfile = () => {
  const { username, email, image } = useSelector((state) => state.signIn)
  const dispatch = useDispatch()
  const token = localStorage.getItem('currentUser')
  const spinIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onchange',
  })

  const [editProfile, { data, isError, isLoading }] = useEditProfileMutation()

  const onSubmit = (user) => {
    const body = JSON.stringify({ user })
    editProfile({ body, token })
  }

  useEffect(() => {
    if (!data) return
    dispatch(signInState(data))
    localStorage.setItem('currentUser', data.user.token)
  }, [data])

  return (
    <>
      {isLoading && <Spin className={styles.spin} indicator={spinIcon} />}
      {isError && (
        <Alert
          className={styles['edit-profile-error']}
          type="warning"
          message="Что-то пошло не так, попробуйте снова!"
          closable
        />
      )}
      {data && <Alert className={styles['edit-profile-good']} type="success" closable message="Данные обновлены!" />}
      <div className={styles['edit-profile']}>
        <form className={styles['edit-profile-form']} onSubmit={handleSubmit(onSubmit)}>
          <span className={styles['form-title']}>Edit Profile</span>
          <div className={styles['form-label']}>
            <label className={styles['form-username']}>
              <span>Username</span>
              <input
                placeholder="Username"
                defaultValue={username}
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
                <span style={{ color: 'red', fontSize: 12, position: 'absolute' }}>{errors.username.message}</span>
              )}
            </label>
            <label className={styles['form-email']}>
              <span>Email address</span>
              <input
                placeholder="Email address"
                type="email"
                defaultValue={email}
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
                <span style={{ color: 'red', fontSize: 12, position: 'absolute' }}>{errors.email.message}</span>
              )}
            </label>
            <label className={styles['form-password']}>
              <span>New password</span>
              <input
                placeholder="New password"
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
                <span style={{ color: 'red', fontSize: 12, position: 'absolute' }}>{errors.password.message}</span>
              )}
            </label>
            <label className={styles['form-image']}>
              <span>Avatar image (url)</span>
              <input
                placeholder="Avatar image"
                defaultValue={image}
                {...register('image', {
                  pattern: {
                    value: /(^https?:\/\/)?[a-z0-9~\-/.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i,
                    message: 'Некорректный URL',
                  },
                })}
              />
              {errors.image && (
                <span style={{ color: 'red', fontSize: 12, position: 'absolute' }}>{errors.image.message}</span>
              )}
            </label>
          </div>
          <input className={styles['form-button']} type="submit" value="Save" />
        </form>
      </div>
    </>
  )
}

export default EditProfile
