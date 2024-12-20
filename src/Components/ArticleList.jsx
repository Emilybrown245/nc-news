import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'; 
import ArticleCard from './ArticleCard'
import { getArticles } from '../api'

function ArticleList () {
    const location = useLocation();
    const [articles, setArticles] = useState([])
    const [error, setError] = useState("")

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search); 
        const topic = params.get('topic');
        const sort_by = params.get('sort_by');
        const order = params.get('order');
        return { topic, sort_by, order };
      };

    useEffect(() => {
        const fetchArticles = async () => {
            try{
                const { topic, sort_by, order } = getQueryParams();
                const data = await getArticles(topic, sort_by, order)
                setArticles(data || []);
                setError("");
            

            } catch (err){
                setError(err.message || "error")
                setArticles([])
            }
        }
      
        fetchArticles()
        
    }, [location.search])

    return (
        <section className="grid-container">
        {error && <p>{error}</p>}
       {Array.isArray(articles) && articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id}/>
        })}
        </section>
    )
}

export default ArticleList


