import {useState, useEffect} from 'react'
import CommentCard from './CommentCard'
import axios from 'axios'

function CommentList ({article_id}) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const getCommentsByArticleId= async () => {
            const { data } = await axios.get(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}/comments`)
            setComments(data.comments)
        }
        getCommentsByArticleId()
    }, [article_id])

    const postCommentToArticleId = async (newComment) => {
        setIsLoading(true)
        try{
            const {data} = await axios.post(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}/comments`, {
                username: "cooljmessy",
                body: newComment,
            })
            setComments((prevComments) => [data.comment, ...prevComments ])
            setNewComment("")
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
   return (
<div className="comments-section">
    {error && <p>{error}</p>}
    <ul className="comments-list">
    <div className="comment-item">
    <form onSubmit={handleSubmit}>
        <label htmlFor="post-comment" >Comment: <input type="text" id="post-comment" required placeholder="write a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)}>
        </input>
        </label>
        <button type="submit" disabled={isLoading}>{isLoading ? "Posting..." : "Post"}</button>
        </form>
     </div>
    {comments.map((comment) => {return <li><CommentCard key={comment.comment_id} comment={comment}/></li>})}
    </ul>
</div>
   ) 
}
export default CommentList