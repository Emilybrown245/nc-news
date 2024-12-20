import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import ArticleCard from './ArticleCard'
import { getArticles } from '../api'

function ArticleList () {
    const {topic} = useParams()
    const [articles, setArticles] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchArticles = async () => {
            try{
                const data  = await getArticles(topic)
                setArticles(data)

            } catch (err){
                setError(err)
            }
        }
      
        fetchArticles()
        
    }, [topic])

    return (
        <section className="grid-container">
        {error && <p>{error}</p>}
       {articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id}/>
        })}
        </section>
    )
}

export default ArticleList


