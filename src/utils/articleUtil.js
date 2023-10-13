export const shortTitle = (text) => {
  if (text.split(' ').length === 1 && text.split('').length > 30) return text.split('').slice(0, 30).join('') + ' ...'
  if (text.split(' ').length > 5) return text.split(' ').slice(0, 5).join(' ') + ' ...'

  return text
}

export const shortDescription = (text) => {
  if (text.split(' ').length === 1 && text.split('').length > 190) return text.split('').slice(0, 190).join('') + ' ...'

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
  if (tags.length > 7) return tags.slice(0, 7)

  return tags
}
