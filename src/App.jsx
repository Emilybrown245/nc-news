import './App.css'
import {Routes, Route, useLocation} from 'react-router'
import React, { useState, useEffect} from 'react';
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import ArticleList from './Components/ArticleList'
import ArticlePage from './Components/ArticlePage'
import UserCard from './Components/UserCard';
import UserLogin from './Components/UserLogin'
import {getUsers} from './api'
import Collapsible from './Components/Collapsible';
import CommentList from './Components/CommentList';

function App() {
  const location = useLocation()
  const [error, setError] = useState("")
  const [listUsers, setListUsers] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

    useEffect(() => {
      if (user) {
        console.log(user); 
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user'); 
      }
    }, [user]);

    useEffect(() => {
      const fetchUsers = async () => {
      try{
          const data = await getUsers()
          setListUsers(data);
          setError("");
      }catch (err){
          setError("Failed to load users")
      }
  }
  fetchUsers()
}, [])

    const selectedUser = listUsers.find((userObj) => userObj.username === user);

 return (
  <>
  <Header user={user} selectedUser={selectedUser}/>
   {(location.pathname !== '/login' && location.pathname !== '/user-card' && location.pathname !== '/articles/:article_id') && <NavBar user={user} setUser={setUser}/>}
  <Routes>
    <Route path="/login" element={<UserLogin user={user} setUser={setUser} listUsers={listUsers} selectedUser={selectedUser} error={error}/>}></Route>
    <Route path="/articles/:article_id" element={<ArticlePage user={user} />}></Route>
    <Route path="/user-card" element={selectedUser ? (
                <UserCard selectedUser={selectedUser} />
            ) : (
                <p>Select a user to view details.</p>
            )}></Route>
    <Route path="/articles" element={<Collapsible><ArticleList /></Collapsible>}></Route>
  </Routes>
  </>
 )
}

export default App
