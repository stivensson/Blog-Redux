import React from 'react'
import { Link } from 'react-router-dom'

import { ARTICLES } from '../../routes'

import styles from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  return (
    <div className={styles['not-found-page']}>
      <span>Ошибка!!!</span>
      <p>Страница не найдена!</p>
      <Link to={ARTICLES}>
        <button>ОК</button>
      </Link>
    </div>
  )
}

export default NotFoundPage
