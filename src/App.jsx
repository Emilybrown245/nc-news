import './App.css'
import {Routes, Route} from 'react-router'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import ArticleList from './Components/ArticleList'
import ArticlePage from './Components/ArticlePage'

function App() {
 return (
  <>
  <NavBar/>
  <Header/>
  <Routes>
    <Route path="/" element={<ArticleList />}></Route>
    <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
    <Route path="/topics/:topic" element={<ArticleList />}></Route>
  </Routes>
  </>
 )
}

export default App
