import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Spin, Pagination } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import Article from '../Article'
import { useDeleteFavoritesMutation, useFavoritesMutation, useGetArticlesQuery } from '../../service/blogApi'
import { getPages } from '../../store/reducers/articlesListSlice'

import styles from './ArticlesList.module.scss'

const ArticlesList = () => {
  const dispatch = useDispatch()
  const { pages } = useSelector((state) => state.articlesList)
  const { isLogin } = useSelector((state) => state.signIn)
  const token = localStorage.getItem('currentUser')
  const countPages = (pages - 1) * 5
  const spinIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />

  const { data, isLoading, isError } = useGetArticlesQuery({ countPages, token })

  const [deleteFavorite, { nowError, nowLoading }] = useDeleteFavoritesMutation({
    selectFromResult: ({ isError, isLoading }) => ({
      nowError: isError,
      nowLoading: isLoading,
    }),
  })

  const [favorites, { isErr, isLoad }] = useFavoritesMutation({
    selectFromResult: ({ isError, isLoading }) => ({
      isErr: isError,
      isLoad: isLoading,
    }),
  })

  return (
    <>
      <div className={styles['articles-list']}>
        {isLoading || nowLoading || isLoad ? (
          <Spin className={styles.spin} indicator={spinIcon} />
        ) : isError || nowError || isErr ? (
          <Alert
            className={styles.error}
            message="Что-то пошло не так, перезагрузите страницу!"
            type="warning"
            closable
          />
        ) : data.articles.length !== 0 ? (
          data.articles.map((item) => (
            <Article
              key={item.slug}
              slug={item.slug}
              title={item.title}
              favorited={item.favorited}
              likes={item.favoritesCount}
              tags={item.tagList}
              description={item.description}
              user={item.author.username}
              avatar={item.author.image}
              date={item.createdAt}
              isLogin={isLogin}
              token={token}
              deleteFavorite={deleteFavorite}
              favorites={favorites}
            />
          ))
        ) : null}
      </div>
      <div className={styles.pagination}>
        {!isLoading && (
          <Pagination
            defaultCurrent={1}
            current={pages}
            total={data.articlesCount}
            defaultPageSize={5}
            showSizeChanger={false}
            onChange={(e) => dispatch(getPages(e))}
          />
        )}
      </div>
    </>
  )
}

export default ArticlesList
