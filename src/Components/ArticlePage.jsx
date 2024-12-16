import Card from 'react-bootstrap/Card'
import {useParams} from 'react-router'
import {Link} from 'react-router'

function ArticlePage ({articles}){
    const {article_id} = useParams();
    const article = articles.find((article) => article.article_id.toString() === article_id);

return  (
<div className="card-container">
<Link to={'/'}><button type="submit">Home Page</button></Link>
<Card style={{ width: "10rem" }} className="card-body" >
<Card.Title>{article.title}</Card.Title>
<Card.Text>{article.author}</Card.Text>
<img src={article.article_img_url} className="article-image"/>
<Card.Text>{article.created_at}</Card.Text>
<Card.Text>{article.topic}</Card.Text>
<Card.Text>{article.votes}</Card.Text>
<Card.Text>{article.comment_count}</Card.Text>
</Card >
</div>
)
}

export default ArticlePage