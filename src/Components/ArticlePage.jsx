import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useParams, Link } from 'react-router'
import {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import CommentList from './CommentList';

function ArticlePage (){
    const {article_id} = useParams();
    const [article, setArticle] = useState([])
    const [votes, setVotes] = useState(0)
    const [error, setError] = useState("")
    const [commentCount, setCommentCount] = useState(0)
  
    const btnRef = useRef()
    const btnRefDownvote = useRef()

    useEffect(() => {
        const getArticleById = async () => {
            
            const { data } = await axios.get(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}`)
            setArticle(data.article)
            setVotes(data.article.votes)
            setCommentCount(data.article.comment_count)
           
        }
        getArticleById()
    }, [article_id])

    const patchVotes = async (increment) => {
        const previousVotes = votes;
        try{
            await axios.patch(`https://nc-news-lo7q.onrender.com/api/articles/${article_id}`, {
               inc_votes: increment,
             })
             setVotes((votes) => votes + increment)
        } catch (error) {
            setVotes(previousVotes)
            setError("Failed to vote. Try again later")
        } 
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
        <Button ref={btnRef} onClick={() => { if (btnRef.current) {patchVotes(1); btnRef.current.setAttribute("disabled", "disabled");}}}>Upvote</Button>
        <Button ref={btnRefDownvote} onClick={() =>  {if (btnRefDownvote.current) {patchVotes(-1); btnRefDownvote.current.setAttribute("disabled", "disabled");}}}>Downvote</Button>
    { error && <p className="error-msg">{error}</p> }
    <Card.Text>Comments: {commentCount}</Card.Text>
    </Card >

    <CommentList article_id={article_id} updateArticleCommentCount={setCommentCount}/>
</div>
)
}

export default ArticlePage