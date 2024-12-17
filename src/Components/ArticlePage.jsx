import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useParams, Link } from 'react-router'
import {useEffect, useState}from 'react'
import axios from 'axios'
import CommentCard from './CommentCard'

function ArticlePage (){
    const {article_id} = useParams();
    const [article, setArticle] = useState([])
    const [comments, setComments] = useState([])
    useEffect(() => {
        const getArticleById = async () => {
            const { data } = await axios.get(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}`)
            setArticle(data.article)
        }
        getArticleById()
    }, [article_id])

    useEffect(() => {
        const getCommentsByArticleId= async () => {
            const { data } = await axios.get(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}/comments`)
            setComments(data.comments)
        }
        getCommentsByArticleId()
    }, [article_id])

return  (
<div className="card-container-article-page">
    <Link to={'/'}><Button variant="dark">Home Page</Button></Link>
    <Card style={{ width: "10rem" }} className="card-body-article-page" >
    <Card.Title className="article-page-header">{article.title}</Card.Title>
    <Card.Text>{article.author}</Card.Text>
    <img src={article.article_img_url} className="article-page-image"/>
    <Card.Text>{article.created_at}</Card.Text>
    <Card.Text>Topic: {article.topic}</Card.Text>
    <Card.Text>Votes: {article.votes}</Card.Text>
    <Card.Text>Comments: {article.comment_count}</Card.Text>
    </Card >
<div className="comments-section">
    <ul className="comments-list">
    {comments.map((comment) => {return <li><CommentCard key={comment.comment_id} comment={comment}/></li>})}
    </ul>
</div>
</div>
)
}

export default ArticlePage