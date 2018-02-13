const deleteRequest = (commentId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
    method: 'DELETE',
  })
    .then(res => res);
}

export default deleteRequest