import dayjs from 'dayjs';

function CommentCard ({comment, user}) {
  const convertedTime = comment.created_at;
  const formattedDate = dayjs(convertedTime).format('dddd, MMMM D, YYYY');

return (
    <div className="comment-item">
        <img src={user.avatar_url}></img>
        <div className='comment-body-background'>
    <p className="comment-body-article-page">{comment.body}</p>
    </div>
    <p>{formattedDate}</p>
    <p>{comment.author}</p>
    <p>Votes: {comment.votes}</p>
    </div>
)
}

export default CommentCard