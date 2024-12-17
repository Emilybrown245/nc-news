import {useState, useEffect} from 'react'
import CommentCard from './CommentCard'
import axios from 'axios'

function CommentList ({article_id}) {
    const [comments, setComments] = useState([])
    useEffect(() => {
        const getCommentsByArticleId= async () => {
            const { data } = await axios.get(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}/comments`)
            setComments(data.comments)
        }
        getCommentsByArticleId()
    }, [article_id])

   return (
<div className="comments-section">
    <ul className="comments-list">
    {comments.map((comment) => {return <li><CommentCard key={comment.comment_id} comment={comment}/></li>})}
    </ul>
</div>
   ) 
}
export default CommentList