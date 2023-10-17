import React from 'react'

import styles from './NewArticle.module.scss'

const NewArticle = () => {
  return (
    <div className={styles['new-article']}>
      <form className={styles['new-article-form']}>
        <span className={styles['form-title']}>Create new article</span>
        <div className={styles['form-label']}>
          <label className={styles['label-title']}>
            <span>Title</span>
            <input placeholder="Title" />
          </label>
          <label className={styles['label-description']}>
            <span>Short description</span>
            <input placeholder="Description" />
          </label>
          <label className={styles['label-text']}>
            <span>Text</span>
            <input placeholder="Text" />
          </label>
          <input className={styles['button-submit']} type="Submit" value="Send" />
        </div>
      </form>
    </div>
  )
}

export default NewArticle
