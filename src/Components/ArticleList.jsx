import axios from 'axios'
import {useEffect, useState} from 'react'
import ArticleCard from './ArticleCard'

function ArticleList () {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        const getArticles = async () => {
            const { data } = await axios.get("https://nc-news-lo7q.onrender.com/api/articles")
            setArticles(data.articles)
        }
        getArticles()
    }, [])

    return (
        <section className="grid-container">
       {articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id}/>
        })}
        </section>
    )
}

export default ArticleList


