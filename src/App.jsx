import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import ArticleList from './Components/ArticleList'
import ArticlePage from './Components/ArticlePage'

function App() {
  const [articles, setArticles] = useState([]);
 return (
  <>
  <NavBar/>
  <Header/>
  <Routes>
    <Route path="/" element={<ArticleList articles={articles} setArticles={setArticles}/>}></Route>
    <Route path="/articles/:article_id" element={<ArticlePage/>}></Route>
  </Routes>
  </>
 )
}

export default App
