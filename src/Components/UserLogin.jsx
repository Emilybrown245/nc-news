import {useState} from 'react'
import UserCard from './UserCard';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'; 

function UserLogin ({user, setUser, listUsers, selectedUser, error}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser(e.target.value);
      };

  const handleLoginClick = () => {
    if (selectedUser) {
        setIsLoggedIn(true);
        navigate("/user-card");
      }
  };
  
return (  
    
    <div className="login-container">
    {error && <p>{error}</p>}
    {/* <div className="login-body"> */}
<div className="login">
    <label htmlFor="user-dropdown" className="label">Select your Mr or Little Miss: </label>
    <div className="custom-dropdown">
      <select id="user-dropdown" value={user || ''} onChange={handleChange} >
        <option>Select user</option>
        {listUsers.map((userObj) => (
            <option key={userObj.username} value={userObj.username}>
              {userObj.username}
              </option>
                ))}
      </select>
      </div>
      {user && <Button onClick={handleLoginClick} className="login-button">Login</Button>}
      </div>
      {/* </div> */}
      {isLoggedIn && selectedUser && <UserCard selectedUser={selectedUser} />}
    </div>
   
        )
}
export default UserLogin