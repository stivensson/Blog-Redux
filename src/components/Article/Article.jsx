import React from 'react'
import { Link } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import { Button } from 'antd'
import { format } from 'date-fns'

import { shortDescription, shortTags, shortTitle, shortTagsText } from '../../utils'

import styles from './Article.module.scss'

const Article = ({ slug, title, likes, tags, description, user, avatar, date, favorited }) => {
  return (
    <div className={styles.article}>
      <div className={styles['article-body']}>
        <div className={styles['article-body-wrapper']}>
          <Link to={`/articles/${slug}`}>
            <div className={styles['article-body-title']}>{shortTitle(title)}</div>
          </Link>
          <div className={styles['article-body-likes']}>
            {favorited ? '❤️️' : '🤍'} {likes}
          </div>
        </div>
        <div className={styles['article-body-tags']}>
          {tags.length ? (
            shortTags(tags).map((item) => item && <Button key={nanoid()}>{shortTagsText(item)}</Button>)
          ) : (
            <div className={styles['article-no-tags']} />
          )}
        </div>
        <div className={styles['article-body-description']}>{shortDescription(description)}</div>
      </div>
      <div className={styles['article-user']}>
        <div className={styles['article-user-wrapper']}>
          <div className={styles['article-user-username']}>{user}</div>
          <div className={styles['article-user-date']}>{format(new Date(date), 'MMMM dd, yyyy')}</div>
        </div>
        <img className={styles['article-user-avatar']} alt="avatar" src={avatar} />
      </div>
    </div>
  )
}

export default Article
