import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { format } from 'date-fns'

import './Article.scss'

const Article = ({ title, likes, tags, description, user, avatar, date }) => {
  const shortTitle = (text) => {
    if (text.split(' ').length === 1 && text.split('').length > 30) return text.split('').slice(0, 30).join('') + ' ...'

    return text
  }

  const shortDescription = (text) => {
    if (text.split(' ').length === 1 && text.split('').length > 190)
      return text.split('').slice(0, 190).join('') + ' ...'

    if (text.split(' ').length > 30) return text.split(' ').slice(0, 30).join(' ') + ' ...'

    return text
  }

  return (
    <div className="article">
      <div className="article-body">
        <div className="article-body-wrapper">
          <div className="article-body-title">{shortTitle(title)}</div>
          <div className="article-body-likes">
            {<HeartOutlined />} {likes}
          </div>
        </div>
        <div className="article-body-tags">
          {tags.length ? tags.map((item) => <Button key={nanoid()}>{item}</Button>) : <Button disabled> </Button>}
        </div>
        <div className="article-body-description">{shortDescription(description)}</div>
      </div>
      <div className="article-user">
        <div className="article-user-wrapper">
          <div className="article-user-username">{user}</div>
          <div className="article-user-date">{format(new Date(date), 'MMMM dd, yyyy')}</div>
        </div>
        <img className="article-user-avatar" alt="avatar" src={avatar} />
      </div>
    </div>
  )
}

export default Article
