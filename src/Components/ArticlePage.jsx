import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useParams} from 'react-router'
import {Link} from 'react-router'


function ArticlePage ({articles}){
    const {article_id} = useParams();
    const article = articles.find((article) => article.article_id.toString() === article_id);

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
</div>
)
}

export default ArticlePage