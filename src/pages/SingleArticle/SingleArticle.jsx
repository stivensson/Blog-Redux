import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin, Alert, Popconfirm } from 'antd'
import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import { nanoid } from '@reduxjs/toolkit'

import { shortDescription, shortTags, shortTitle, shortTagsText } from '../../utils'
import {
  useDeleteArticleMutation,
  useDeleteFavoritesMutation,
  useFavoritesMutation,
  useGetSingleArticleQuery,
} from '../../service/blogApi'

import styles from './SingleArticle.module.scss'

const SingleArticle = () => {
  const { isLogin, username } = useSelector((state) => state.signIn)
  const [redirect, setRedirect] = useState(false)
  const { slug } = useParams()
  const navigation = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('currentUser')

  const spinIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />

  const { data, isLoading, isError } = useGetSingleArticleQuery({ slug, token })

  const [deleteArticle, { isSuccess, nowErr }] = useDeleteArticleMutation({
    selectFromResult: ({ isError, isSuccess }) => ({
      nowErr: isError,
      isSuccess: isSuccess,
    }),
  })

  const [favorites, { isErr, isLoad }] = useFavoritesMutation({
    selectFromResult: ({ isError, isLoading }) => ({
      isErr: isError,
      isLoad: isLoading,
    }),
  })

  const [deleteFavorite, { nowError, nowLoading }] = useDeleteFavoritesMutation({
    selectFromResult: ({ isError, isLoading }) => ({
      nowError: isError,
      nowLoading: isLoading,
    }),
  })

  const delArt = () => {
    deleteArticle({ slug, token })
  }

  useEffect(() => {
    if (!isSuccess) return
    navigation('/articles')
  }, [isSuccess])

  const favoriting = () => {
    if (!isLogin) {
      setRedirect(true)
    } else if (data.article.favorited) {
      deleteFavorite({ slug, token })
    } else {
      favorites({ slug, token })
    }
  }

  if (redirect) {
    return <Navigate to="/sign-in" state={{ from: location }} />
  }

  return (
    <div className={styles['single-article']}>
      {isLoading || isLoad || nowLoading ? (
        <Spin className={styles.spin} indicator={spinIcon} />
      ) : isError || isErr || nowError || nowErr ? (
        <Alert
          className={styles.error}
          message="Что-то пошло не так, перезагрузите страницу!"
          type="warning"
          closable
        />
      ) : data.article ? (
        <>
          <div className={styles['single-article-header']}>
            <div className={styles['single-article-body']}>
              <div className={styles['single-article-body-wrapper']}>
                <div className={styles['single-article-body-title']}>{shortTitle(data.article.title)}</div>
                <div className={styles['single-article-body-likes']}>
                  <div className={styles['single-article-body-favorited']} onClick={favoriting}>
                    {data.article.favorited ? '❤️️' : '🤍'}
                  </div>
                  {data.article.favoritesCount}
                </div>
              </div>
              <div className={styles['single-article-body-tags']}>
                {data.article.tagList.length ? (
                  shortTags(data.article.tagList).map((item) => <Button key={nanoid()}>{shortTagsText(item)}</Button>)
                ) : (
                  <div className={styles['single-article-no-tags']} />
                )}
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
          <div className={styles['single-article-description-wrapper']}>
            <div className={styles['single-article-body-description']}>
              {shortDescription(data.article.description)}
            </div>
            {username === data.article.author.username && (
              <>
                <Popconfirm
                  title="Удаление статьи"
                  description="Вы действительно хотите удалить статью?"
                  okText="Да"
                  cancelText="Нет"
                  onConfirm={delArt}
                >
                  <Button className={styles['delete-article-button']} danger>
                    Delete
                  </Button>
                </Popconfirm>
                <Link to={`/articles/${slug}/edit`}>
                  <Button className={styles['edit-article-button']}>Edit</Button>
                </Link>
              </>
            )}
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
