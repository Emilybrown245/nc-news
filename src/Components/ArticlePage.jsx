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
    const [isLoading, setIsLoading] = useState(false)
    const [votes, setVotes] = useState(0)
    const [error, setError] = useState("")
    const [commentCount, setCommentCount] = useState(0)
    const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(false);
    const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [firstClick, setFirstClick] = useState(null);

    useEffect(() => {
        setIsLoading(true)
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
        } finally{
            setIsLoading(false)
        }
       }

       const handleUpvoteClick = async () => {
        if (!firstClick) {
            setFirstClick("upvote"); 
          }

          if(firstClick === "downvote"){
            await patchVotes(2)
          } else {
            await patchVotes(1)
          }
        setClickCount((prevCount) => prevCount + 1);
        if (clickCount === 0 && firstClick === "upvote") {
            setIsDownvoteDisabled(false); 
          } else {
            setIsDownvoteDisabled(false); 
          }
          setIsUpvoteDisabled(true); 
       }

       const handleDownvoteClick = async () => {
        if (!firstClick) {
            setFirstClick("downvote"); 
          }
      
          if (firstClick === "upvote") {
            await patchVotes(-2);
          } else {
            await patchVotes(-1);
          }
        setIsDownvoteDisabled(true); 
        setIsUpvoteDisabled(false); 
        setClickCount((prevCount) => prevCount + 1);
        if (clickCount === 0 && firstClick === "downvote") {
            setIsDownvoteDisabled(false); 
          } else {
            setIsDownvoteDisabled(true); 
          }
          setIsUpvoteDisabled(false);
       }

    const areBothDisabled = clickCount >= 2;
    
      const convertedTime = article.created_at;
      const formattedDate = dayjs(convertedTime).format('dddd, MMMM D, YYYY');
      
return  (

<div className="card-container-article-page">
    <Link to={'/articles'} id='link-to-home-page' className="link"><span className="link-text">Home Page</span></Link>
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
    <div className="vote-buttons">
        <Button onClick={handleUpvoteClick}
         disabled={isUpvoteDisabled || areBothDisabled}> <img
         src="https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
         alt="Upvote" className="upvote-downvote-btns"
       />Upvote</Button>

         <Button onClick={handleDownvoteClick}
         disabled={isDownvoteDisabled || areBothDisabled}><img
         src="https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013"
         alt="Downvote" className="upvote-downvote-btns"
       />Downvote</Button>
</div>
    { error && <p className="error-msg">{error}</p> }
    <Card.Text>Comments: {commentCount}</Card.Text>
    </Card >

    <CommentList article_id={article_id} updateArticleCommentCount={setCommentCount} user={user}/>
</div>
)
}

export default ArticlePage