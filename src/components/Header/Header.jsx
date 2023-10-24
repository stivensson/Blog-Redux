import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import { logOutState } from '../../store/reducers/signInSlice'
import { getPages } from '../../store/reducers/articlesListSlice'
import { ARTICLES, NEW_ARTICLE, PROFILE, SIGN_IN, SIGN_UP } from '../../routes'

import styles from './Header.module.scss'

const Header = () => {
  const { isLogin, image, username } = useSelector((state) => state.signIn)
  const [imgErr, setImgErr] = useState(false)
  const dispatch = useDispatch()
  const token = localStorage.getItem('currentUser')
  const imageOut = 'https://static.productionready.io/images/smiley-cyrus.jpg'

  const logOut = () => {
    dispatch(getPages(1))
    dispatch(logOutState())
    localStorage.removeItem('currentUser')
  }

  const imgE = new Image()
  if (image) imgE.src = image
  imgE.onload = function () {
    setImgErr(false)
  }
  imgE.onerror = function () {
    setImgErr(true)
  }

  return (
    <div className={styles.header}>
      <Link to={ARTICLES}>
        <span>Realworld Blog</span>
      </Link>
      {!isLogin && !token ? (
        <div className={styles['header-no-sign']}>
          <Link to={SIGN_IN}>
            <Button className={styles['header-button']} type="text">
              Sign In
            </Button>
          </Link>
          <Link to={SIGN_UP}>
            <Button className={`${styles['header-button']} ${styles['sign-up']}`}>Sign Up</Button>
          </Link>
        </div>
      ) : (
        <div className={styles['header-sign']}>
          <Link to={NEW_ARTICLE}>
            <Button className={styles['create-article']}>Create article</Button>
          </Link>
          <Link to={PROFILE}>
            <span className={styles['username']} type="text">
              {username}
            </span>
            <div className={styles.avatar}>
              {!image ? (
                <img src={imageOut} alt="avatar" />
              ) : image && imgErr ? (
                <img src={imageOut} alt="avatar" />
              ) : (
                <img src={image} alt="avatar" />
              )}
            </div>
          </Link>
          <Link to={ARTICLES}>
            <Button className={`${styles['header-button']} ${styles['log-out']}`} onClick={logOut}>
              Log Out
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
