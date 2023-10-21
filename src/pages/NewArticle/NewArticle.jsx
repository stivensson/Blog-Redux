import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { Button, Alert, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { useEditArticleMutation, useGetSingleArticleQuery, useNewArticleMutation } from '../../service/blogApi'

import styles from './NewArticle.module.scss'

const NewArticle = () => {
  const { slug } = useParams()
  const token = localStorage.getItem('currentUser')
  const navigation = useNavigate()
  const [skip, setSkip] = useState(true)

  const spinIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />

  useEffect(() => {
    if (slug) {
      setSkip(false)
    } else {
      setSkip(true)
    }
  }, [slug])

  const { art, isErr } = useGetSingleArticleQuery(
    { slug, token },
    {
      selectFromResult: ({ data, isError }) => ({
        art: data?.article,
        isErr: isError,
      }),
      skip,
    }
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    values: {
      tagList: art?.tagList,
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
    rules: {
      maxLength: {
        value: 10,
        message: 'Максимум 10 тегов',
      },
    },
  })

  const [newArticle, { data, isError, isLoading }] = useNewArticleMutation()
  const [editArticle, { res, nowError, isLoad }] = useEditArticleMutation({
    selectFromResult: ({ data, isError, isLoading }) => ({
      res: data,
      nowError: isError,
      isLoad: isLoading,
    }),
  })

  const onSubmit = (article) => {
    const body = JSON.stringify({ article })
    slug ? editArticle({ body, token, slug }) : newArticle({ body, token })
  }

  useEffect(() => {
    if (!res) return
    navigation(`/articles/${res.article.slug}`)
  }, [res])

  useEffect(() => {
    if (!data) return
    navigation(`/articles/${data.article.slug}`)
  }, [data])

  return (
    <>
      {(isLoading || isLoad) && <Spin className={styles.spin} indicator={spinIcon} />}
      {(isError || isErr || nowError) && (
        <Alert
          className={styles['edit-profile-error']}
          type="warning"
          message="Что-то пошло не так, попробуйте снова!"
          closable
        />
      )}
      <div className={styles['new-article']}>
        <form className={styles['new-article-form']} onSubmit={handleSubmit(onSubmit)}>
          <span className={styles['form-title']}>{slug ? 'Edit article' : 'Create new article'}</span>
          <div className={styles['form-label']}>
            <label className={styles['label-title']}>
              <span>Title</span>
              <input
                defaultValue={art?.title}
                placeholder="Title"
                {...register('title', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 2,
                    message: 'Минимум 2 символа',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Максимум 50 символов',
                  },
                  pattern: {
                    value: /^[^\s]/,
                    message: 'Пробел, первым символом - не допустимо',
                  },
                })}
              />
              {errors.title && (
                <span style={{ color: 'red', fontSize: 12, position: 'absolute', marginTop: -6 }}>
                  {errors.title.message}
                </span>
              )}
            </label>
            <label className={styles['label-description']}>
              <span>Short description</span>
              <input
                defaultValue={art?.description}
                placeholder="Description"
                {...register('description', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 2,
                    message: 'Минимум 2 символа',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Максимум 200 символов',
                  },
                  pattern: {
                    value: /^[^\s]/,
                    message: 'Пробел, первым символом - не допустимо',
                  },
                })}
              />
              {errors.description && (
                <span style={{ color: 'red', fontSize: 12, position: 'absolute', marginTop: -5 }}>
                  {errors.description.message}
                </span>
              )}
            </label>
            <label className={styles['label-text']}>
              <span>Text</span>
              <TextareaAutosize
                defaultValue={art?.body}
                placeholder="Text"
                {...register('body', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 2,
                    message: 'Минимум 2 символа',
                  },
                  maxLength: {
                    value: 5000,
                    message: 'Максимум 5000 символов',
                  },
                  pattern: {
                    value: /^[^\s]/,
                    message: 'Пробел, первым символом - не допустимо',
                  },
                })}
              />
              {errors.body && (
                <span style={{ color: 'red', fontSize: 12, position: 'absolute', marginTop: -10 }}>
                  {errors.body.message}
                </span>
              )}
            </label>
            <label className={styles['label-tags']}>
              <span>Tags</span>
              {fields.map((field, index) => {
                return (
                  <div className={styles['array-tags']} key={field.id}>
                    <div>
                      <input
                        className={styles['array-input']}
                        {...register(`tagList.${index}.[]`, {
                          required: 'Поле обязательно к заполнению',
                          minLength: {
                            value: 2,
                            message: 'Минимум 2 символа',
                          },
                          pattern: {
                            value: /^[^\s]/,
                            message: 'Пробел, первым символом - не допустимо',
                          },
                        })}
                      />
                      {errors.tagList?.[index] && (
                        <span style={{ color: 'red', fontSize: 12, position: 'absolute', marginTop: -20 }}>
                          {errors.tagList?.[index].message}
                        </span>
                      )}
                    </div>
                    <Button className={styles['delete-tag-button']} onClick={() => remove(index)}>
                      Delete
                    </Button>
                  </div>
                )
              })}
            </label>
            <label className={styles['label-add-tags']}>
              {errors.tags && (
                <span style={{ color: 'red', fontSize: 16, position: 'absolute', marginTop: 35, marginLeft: 90 }}>
                  {errors.tags?.root?.message}
                </span>
              )}
              <Button className={styles['add-tag-button']} onClick={() => append('')}>
                Add tag
              </Button>
            </label>
            <input className={styles['button-submit']} type="Submit" defaultValue="Send" />
          </div>
        </form>
      </div>
    </>
  )
}

export default NewArticle
