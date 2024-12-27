import {useState, useEffect} from 'react'
import CommentCard from './CommentCard'
import {useParams} from 'react-router'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function CommentList ({article_id, updateArticleCommentCount, user}) {
    const { comment_id } = useParams();
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingCommentId, setIsLoadingCommentId] = useState(0)
    const [deletedComment, setDeletedComment] = useState("")
   
    const loggedInUser = user

    useEffect(() => {
        const getCommentsByArticleId= async () => {
            const { data } = await axios.get(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}/comments`)
            setComments(data.comments)
            updateArticleCommentCount(data.comments.length);
        }
        getCommentsByArticleId()
    }, [article_id])

    const postCommentToArticleId = async (newComment) => {
        setIsLoading(true)
        try{
            const {data} = await axios.post(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}/comments`, {
                username: loggedInUser,
                body: newComment,
            })
            setComments((prevComments) => [data.comment, ...prevComments ])
            setNewComment("")
            updateArticleCommentCount((comment_count) => comment_count+ 1);
            
        } catch (err) {
            setError("Failed to post comment. Try again later")
        }
     finally {
        setIsLoading(false); 
    }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postCommentToArticleId(newComment)
    }

    const deleteCommentByCommentId = async (comment_id) => {
        setIsLoadingCommentId(comment_id)
        try{
            await axios.delete(`https://nc-news-lo7q.onrender.com/api/comments/${comment_id}`)
           setComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== comment_id))
           setDeletedComment("Comment has been successfully deleted.")
           updateArticleCommentCount((comment_count) => comment_count - 1);
        } catch (err) {
            setError("Failed to delete comment. Try again.")
        }   finally {
            setIsLoadingCommentId(0);
        }
    }
  
    
   return (
<div className="comments-section">
    {error && <p>{error}</p>}
    <ul className="comments-list">
    <div className="comment-item">
    <form onSubmit={handleSubmit}>
        <label htmlFor="post-comment" className="comment-text">Comment: <input type="text" id="post-comment" required placeholder="write a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)}>
        </input>
        </label>
        <button className="post-comment-btn" type="submit" disabled={isLoading}><span className="post-btn-text">{isLoading ? "Posting..." : "Post"}</span></button>
        </form>
     </div>
     {deletedComment && <p>{deletedComment}</p>}
    {comments.map((comment) => {
        return <li key={comment.comment_id}>
            <CommentCard comment={comment}/>
            {comment.author === loggedInUser && (
        <Button className="delete-button" onClick={() => deleteCommentByCommentId(comment.comment_id)} disabled={isLoadingCommentId === comment.comment_id}>{isLoadingCommentId ? "Deleting..." : "Delete"}</Button>
    )}
    </li>
})}
    </ul>
</div>
   ) 
}
export default CommentList