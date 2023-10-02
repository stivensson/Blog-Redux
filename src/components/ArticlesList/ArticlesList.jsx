import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Alert, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './ArticlesList.scss'

import { useGetArticlesQuery } from '../../service/blogApi'
import Article from '../Article'

const ArticlesList = () => {
  const { data, isLoading, isError } = useGetArticlesQuery()

  const spinIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />

  return (
    <div className="articles-list">
      {isLoading ? (
        <Spin className="spin" indicator={spinIcon} />
      ) : isError ? (
        <Alert
          className="error"
          message="Внимание, ошибка соединения!"
          description="- проверьте интернет соединение или перезагрузите страницу."
          type="error"
          closable
        />
      ) : data.articles.length !== 0 ? (
        data.articles.map((item) => (
          <Article
            key={nanoid()}
            title={item.title}
            likes={item.favoritesCount}
            tags={item.tagList}
            description={item.description}
            user={item.author.username}
            avatar={item.author.image}
            date={item.createdAt}
          />
        ))
      ) : null}
    </div>
  )
}

export default ArticlesList
