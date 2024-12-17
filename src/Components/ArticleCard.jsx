import Card from 'react-bootstrap/Card'
import {useParams} from 'react-router'
import {Link} from 'react-router'

function ArticleCard ({article}) {
    
return (
   
    <div className="card-container">
        <Card style={{ width: "10rem" }} className="card-body" >
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.author}</Card.Text>
        <img src={article.article_img_url} className="article-image"/>
        <Card.Text>{article.created_at}</Card.Text>
        <Card.Text>{article.topic}</Card.Text>
        <Link to={`articles/${article.article_id}`}><button>Read More</button></Link>
        </Card >
    </div>

)
}

export default ArticleCard
