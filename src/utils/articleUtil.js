export const shortTitle = (text) => {
  if (text.split(' ').length === 1 && text.split('').length > 30) return text.split('').slice(0, 30).join('') + ' ...'
  if (text.split(' ').length > 5) return text.split(' ').slice(0, 5).join(' ') + ' ...'

  return text
}

export const shortDescription = (text) => {
  if (text.split(' ').length === 1 && text.split('').length > 125) return text.split('').slice(0, 125).join('') + ' ...'

  if (text.split(' ').length > 1 && text.split(' ').length < 20) {
    return (
      text
        .split(' ')
        .map((item) => {
          return item.split('').length > 50 ? item.split('').slice(0, 50).join('') : item
        })
        .join(' ') + ' ...'
    )
  }

  if (text.split(' ').length > 30) return text.split(' ').slice(0, 30).join(' ') + ' ...'

  return text
}

export const shortTags = (tags) => {
  if (tags.length > 6) return tags.slice(0, 6)

  return tags
}

export const shortTagsText = (tagsText) => {
  if (tagsText.split(' ').length === 1 && tagsText.split('').length > 10)
    return tagsText.split('').slice(0, 10).join('') + ' ...'

  return tagsText
}
