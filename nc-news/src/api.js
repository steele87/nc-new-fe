
const changeVote = (articleId, vote) => {
  return fetch(`${process.env.REACT_APP_API_URL}/articles/${articleId}?vote=${vote}`, {
    method: 'PUT'
  }).then(res => res.json());
}

export default changeVote