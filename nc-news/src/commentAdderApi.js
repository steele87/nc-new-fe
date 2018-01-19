const postComment = (articleId, comment) => {
  return fetch(`${process.env.REACT_APP_API_URL}/articles/${articleId}/comments`, {
    method: 'POST',
    body: JSON.stringify({comment}),
    headers: new Headers ({
      'Content-Type': 'application/json'
    })
  }).then(res => res);
}

export default postComment