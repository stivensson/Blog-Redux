import React from 'react'

import './App.scss'

import Header from '../Header'
import ArticlesList from '../ArticlesList'
import PaginationPage from '../PaginationPage'

const App = () => {
  return (
    <>
      <Header />
      <ArticlesList />
      <PaginationPage />
    </>
  )
}

export default App
