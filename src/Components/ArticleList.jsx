import axios from 'axios'
import {useEffect} from 'react'
import ArticleCard from './ArticleCard'

function ArticleList ({articles, setArticles}) {
    useEffect(() => {
        const getArticles = () => {
            return axios.get("https://nc-news-lo7q.onrender.com/api/articles")
                .then(({ data }) => {
                    setArticles(data.articles)
                })
        }
        getArticles()
    }, [])

    return (
        <section className="grid-container">
       {articles.map((article) => {
        console.log(article)
            return <ArticleCard article={article} key={article.article_id}/>
        })}
        </section>
    )
}

export default ArticleList


