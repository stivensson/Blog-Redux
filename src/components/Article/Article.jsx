import React from 'react'
import { Link } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { format } from 'date-fns'

import { shortDescription, shortTags, shortTitle, shortTagsText } from '../../utils'
import { getSlug } from '../../store/reducers/articleSlice'

import styles from './Article.module.scss'

const Article = ({ slug, title, likes, tags, description, user, avatar, date }) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.article}>
      <div className={styles['article-body']}>
        <div className={styles['article-body-wrapper']}>
          <Link to={`/articles/${slug}`}>
            <div className={styles['article-body-title']} onClick={() => dispatch(getSlug(slug))}>
              {shortTitle(title)}
            </div>
          </Link>
          <div className={styles['article-body-likes']}>
            {<HeartOutlined />} {likes}
          </div>
        </div>
        <div className={styles['article-body-tags']}>
          {tags.length ? (
            shortTags(tags).map((item) => <Button key={nanoid()}>{shortTagsText(item)}</Button>)
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
