const changeCommentVote = (commentId, vote) => {
  return fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}?vote=${vote}`, {
    method: 'PUT'
  }).then(res => res);
}

export default changeCommentVote