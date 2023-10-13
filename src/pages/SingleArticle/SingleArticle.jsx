import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { HeartOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Spin, Alert } from 'antd'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import Markdown from 'markdown-to-jsx'

import { shortDescription, shortTags, shortTitle } from '../../utils'
import { useGetSingleArticleQuery } from '../../service/blogApi'

import styles from './SingleArticle.module.scss'

const SingleArticle = () => {
  const { slug } = useSelector((state) => state.article)
  const { data, isLoading, isError } = useGetSingleArticleQuery(slug)

  const spinIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />

  return (
    <div className={styles['single-article']}>
      {isLoading ? (
        <Spin className={styles.spin} indicator={spinIcon} />
      ) : isError ? (
        <Alert
          className={styles.error}
          message="Внимание, ошибка соединения!"
          description="- проверьте интернет соединение или перезагрузите страницу."
          type="error"
          closable
        />
      ) : data.article ? (
        <>
          <div className={styles['single-article-header']}>
            <div className={styles['single-article-body']}>
              <div className={styles['single-article-body-wrapper']}>
                <div className={styles['single-article-body-title']}>{shortTitle(data.article.title)}</div>
                <div className={styles['single-article-body-likes']}>
                  {<HeartOutlined />} {data.article.likes}
                </div>
              </div>
              <div className={styles['single-article-body-tags']}>
                {data.article.tagList.length ? (
                  shortTags(data.article.tagList).map((item) => <Button key={nanoid()}>{item}</Button>)
                ) : (
                  <div className={styles['single-article-no-tags']} />
                )}
              </div>
              <div className={styles['single-article-body-description']}>
                {shortDescription(data.article.description)}
              </div>
            </div>
            <div className={styles['single-article-user']}>
              <div className={styles['single-article-user-wrapper']}>
                <div className={styles['single-article-user-username']}>{data.article.author.username}</div>
                <div className={styles['single-article-user-date']}>
                  {format(new Date(data.article.createdAt), 'MMMM dd, yyyy')}
                </div>
              </div>
              <img className={styles['single-article-user-avatar']} alt="avatar" src={data.article.author.image} />
            </div>
          </div>
          <div className={styles['single-article-text']}>
            <Markdown>{data.article.body}</Markdown>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default SingleArticle
