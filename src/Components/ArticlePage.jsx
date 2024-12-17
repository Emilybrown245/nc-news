import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useParams, Link } from 'react-router'
import {useEffect, useState}from 'react'
import axios from 'axios'
import CommentList from './CommentList';

function ArticlePage (){
    const {article_id} = useParams();
    const [article, setArticle] = useState([])
    const [votes, setVotes] = useState(0)
    useEffect(() => {
        const getArticleById = async () => {
            const { data } = await axios.get(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}`)
            setArticle(data.article)
            setVotes(data.article.votes)
            console.log(data.article)
          
        }
        getArticleById()
    }, [article_id])

    const patchVotes = async (increment) => {
        await axios.patch(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}`, {
           inc_votes: increment,
         })
         console.log(article)
         setVotes((votes) => votes + increment)
       }
    
    
return  (
<div className="card-container-article-page">
    <Link to={'/'}><Button variant="dark">Home Page</Button></Link>
    <Card style={{ width: "10rem" }} className="card-body-article-page" >
    <Card.Title className="article-page-header">{article.title}</Card.Title>
    <Card.Text>{article.author}</Card.Text>
    <img src={article.article_img_url} className="article-page-image"/>
    <Card.Text>{article.body}</Card.Text>
    <Card.Text>{article.created_at}</Card.Text>
    <Card.Text>Topic: {article.topic}</Card.Text>
    <Card.Text>Votes: {votes}</Card.Text>
    <Button onClick={() => patchVotes(1)}>Upvote</Button>
    <Button onClick={() => patchVotes(-1)}>Downvote</Button>
    <Card.Text>Comments: {article.comment_count}</Card.Text>
    </Card >
    <CommentList article_id={article_id}/>
</div>
)
}

export default ArticlePage