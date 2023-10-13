import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from '../Header'
import ArticlesList from '../ArticlesList'
import SingleArticle from '../../pages/SingleArticle'
import CreateUser from '../../pages/CreateUser'

import './App.module.scss'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/slug" element={<SingleArticle />} />
        <Route path="/sign-up" element={<CreateUser />} />
      </Routes>
    </>
  )
}

export default App
