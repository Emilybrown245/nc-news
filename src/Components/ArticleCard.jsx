import Card from 'react-bootstrap/Card'
import {Link} from 'react-router'
import dayjs from 'dayjs';

function ArticleCard ({article}) {

    const convertedTime = article.created_at;
    const formattedDate = dayjs(convertedTime).format('dddd, MMMM D, YYYY');
return (
    <div className="card-container">
        <div className="card-body">
        <Card style={{ width: "10rem" }}>
        <Card.Text className="text" id="article-author-text">{article.author}</Card.Text>
        <img src={article.article_img_url} className="article-image"/>
         <div className="article-card-text-body"> 
        <Card.Title className="text" id="article-title">{article.title}</Card.Title>
        <Card.Text className="text">{formattedDate}</Card.Text>
        <Card.Text className="text">{article.topic}</Card.Text>
        <Link to={`/articles/${article.article_id}`} id="read-more" className="link"><span className='link-text'>Read More</span></Link>
        </div>
        </Card >
        </div>
    </div>
)
}

export default ArticleCard
