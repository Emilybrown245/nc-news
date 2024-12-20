function CommentCard ({comment}) {
  
return (
    <div className="comment-item">
    <p>{comment.body}</p>
    <p>{comment.created_at}</p>
    <p>{comment.author}</p>
    <p>Votes: {comment.votes}</p>
    </div>
)
}

export default CommentCard