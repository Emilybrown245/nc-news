import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useParams, Link } from 'react-router'
import {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import CommentList from './CommentList';
import dayjs from 'dayjs';

function ArticlePage ({user}){
    const {article_id} = useParams();
    const [article, setArticle] = useState([])
    const [votes, setVotes] = useState(0)
    const [error, setError] = useState("")
    const [commentCount, setCommentCount] = useState(0)
    const [downvotes, setDownvotes] = useState(0); 
  
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

       const handleDownvote = () => {
        if (downvotes < 2) { // Allow up to two downvotes
          setDownvotes(prevDownvotes => prevDownvotes + 1);
          patchVotes(-1); // Call the patchVotes function to update votes
          if (btnRefDownvote.current && downvotes + 1 === 2) {
            btnRefDownvote.current.setAttribute("disabled", "disabled"); // Disable downvote button after 2 downvotes
          }
        }
      };
    
      const convertedTime = article.created_at;
      const formattedDate = dayjs(convertedTime).format('dddd, MMMM D, YYYY');
      
return  (
<div className="card-container-article-page">
    <Link to={'/articles'}><Button className="home-page-btn" variant="dark"><span className="home-page-text">Home Page</span></Button></Link>
    <Card style={{ width: "10rem" }} className="card-body-article-page" >
    <Card.Title className="article-page-header">{article.title}</Card.Title>
    <Card.Text className="article-page-author">{article.author}</Card.Text>
    <div className="image-and-text">
    <img src={article.article_img_url} className="article-page-image"/>
    <Card.Text className="article-page-body">{article.body}</Card.Text>
    </div>
    <Card.Text>{formattedDate}</Card.Text>
    <Card.Text>Topic: {article.topic}</Card.Text>
    <Card.Text>Votes: {votes}</Card.Text>
      <Button ref={btnRef} onClick={() => { if (btnRef.current) {patchVotes(1); btnRef.current.setAttribute("disabled", "disabled");}}}>  <img
          src="https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
          alt="Upvote" className="upvote-downvote-btns"
        />Upvote</Button>
        <Button ref={btnRefDownvote} onClick={handleDownvote} disabled={downvotes >= 2}>
        <img
          src="https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013"
          alt="Downvote" className="upvote-downvote-btns"
        />Downvote</Button>
    { error && <p className="error-msg">{error}</p> }
    <Card.Text>Comments: {commentCount}</Card.Text>
    </Card >

    <CommentList article_id={article_id} updateArticleCommentCount={setCommentCount} user={user}/>
</div>
)
}

export default ArticlePage