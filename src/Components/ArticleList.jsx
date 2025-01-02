import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button'
import Collapsible from "./Collapsible"; 
import ArticleCard from './ArticleCard'
import { getArticles } from '../api'

function ArticleList () {
    const location = useLocation();
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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
            setIsLoading(true)
            try{
                const { topic, sort_by, order } = getQueryParams();
                const data = await getArticles(topic, sort_by, order)
                setArticles(data || []);
                setError("");

            } catch (err){
                setError(err.message || "error")
                setArticles([])
            }
            finally {
                setIsLoading(false); 
            }
        }
      
        fetchArticles()
        
    }, [location.search])

 

    return (
        <section className="grid-container">
                {isLoading && <p className='loading-msg'>Loading...</p>}
        {error && <p className="error-msg">{error}</p>}
        {!isLoading && !error && articles.length === 0 && <p className='loading-msg'>No articles found</p>}
        <Collapsible initialCount={9} >
       {Array.isArray(articles) && articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />
        })}
        </Collapsible>
     
        </section>
    )
}

export default ArticleList


