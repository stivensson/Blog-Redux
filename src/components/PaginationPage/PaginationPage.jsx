import React from 'react'
import { Pagination } from 'antd'

import './PaginationPage.scss'

import { useGetArticlesQuery } from '../../service/blogApi'

const PaginationPage = () => {
  const { data, isLoading } = useGetArticlesQuery()

  return (
    !isLoading && (
      <Pagination defaultCurrent={1} total={data.articlesCount} defaultPageSize={5} showSizeChanger={false} />
    )
  )
}

export default PaginationPage
