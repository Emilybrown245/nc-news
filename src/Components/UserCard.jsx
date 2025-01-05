import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'


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
    <div className='read-more-container'>
    <Link to="/articles" className="link" id="read-more"><span className='link-text'>Read Articles</span>
</Link>
</div>
     </Card> 
        </div>
    )
}

export default UserCard