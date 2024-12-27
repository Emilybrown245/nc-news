import dayjs from 'dayjs';

function CommentCard ({comment}) {
  const convertedTime = comment.created_at;
  const formattedDate = dayjs(convertedTime).format('dddd, MMMM D, YYYY');
  
return (
    <div className="comment-item">
    <p>{comment.body}</p>
    <p>{formattedDate}</p>
    <p>{comment.author}</p>
    <p>Votes: {comment.votes}</p>
    </div>
)
}

export default CommentCard