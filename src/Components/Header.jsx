import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
function Header({user, selectedUser}) {

  const navigate = useNavigate();
    const handleAvatarClick = () =>{
        navigate('/user-card')
    }
    if (!selectedUser) {
        return <p id="default-login-text">Select a user to read articles!</p>;
      }
    return (
        <section className="header">
            <h1>NC News</h1>
        <div className="nc-news-background"></div>
            <div className="user-avatar-nav-bar">
      {user ? (
            <Link to={'/user-card'} className="selected-user-avatar-button"> <img src={selectedUser.avatar_url} className="selected-user-avatar" alt={`${selectedUser.username}'s avatar`} style={{ width: 80, height: 80, borderRadius: '50%' }} /></Link>
        ) : (
          <p>No user logged in</p>
        )}
        </div>
        </section>
    )
}

export default Header