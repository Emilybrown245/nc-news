import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import NavBar from './NavBar'

function UserCard ({selectedUser}) {
    if (!selectedUser) {
        return <p>No user data available.</p>;
      }
    return (
       <div className="user-card-container">
            <Card className="card-body-user"> 
    <Card.Title className="user-card-header">{selectedUser.username}</Card.Title>
    <img src={selectedUser.avatar_url} alt={`${selectedUser.username}'s avatar`} className="user-card-image"/> 
    <Card.Text className="user-card-text">{selectedUser.name}</Card.Text>
    <Link to={'/articles'}><Button variant="dark" className="user-card-read-more-btn">Read Articles</Button></Link>
     </Card> 
        </div>
    )
}

export default UserCard