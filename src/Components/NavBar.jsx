import {useNavigate, useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function NavBar ({user, setUser}) {

  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search); 
    return {
      topic: params.get('topic'),
      sort_by: params.get('sort_by'),
      order: params.get('order')
    };
  };

  const updateUrlWithFilters = (updatedParams) => {
    const currentParams = getQueryParams();
    const newParams = new URLSearchParams(currentParams);


    Object.keys(updatedParams).forEach((key) => {
      if (updatedParams[key]) {
        newParams.set(key, updatedParams[key]);
      } else {
        newParams.delete(key); 
      }
    });

    navigate(`/articles?${newParams.toString()}`);
  };

  const handleFilterChange = (filterType, value) => {
    const updatedParams = { ...getQueryParams() }; 

    if (filterType === 'topic') {
      updatedParams.topic = value !== "Select" ? value : null;
    } else if (filterType === 'sort_by') {
      updatedParams.sort_by = value !== "Sort" ? value : null;
    } else if (filterType === 'order') {
      updatedParams.order = value !== "Order" ? value : null;
    }

    updateUrlWithFilters(updatedParams);
    }
  
      const logOutAndReset = () => {
          // Clear session or authentication token
          sessionStorage.clear(); // Or localStorage.clear();
          document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
          // Reset user state
          setUser({ name: "", loggedIn: false });
  
          // Redirect to login or home page
          navigate("/login");
      };

    return(
      <nav>
<div className="navbar-container">
  <div>
    <label htmlFor="topic-dropdown" className="navbar-label">Select a topic: </label>
      <select id="topic-dropdown" defaultValue="Select" onChange={(e) => handleFilterChange('topic', e.target.value)}>
        <option></option>
        <option>coding</option>
        <option>football</option>
        <option>cooking</option>
      </select>
      </div>
      <div>
      <label htmlFor="sort-dropdown-navbar" className="navbar-label">Sort: </label>
      <select id="sort-dropdown-navbar" defaultValue="Sort" onChange={(e) => handleFilterChange('sort_by', e.target.value)}>
        <option></option>
        <option>comment_count</option>
        <option>votes</option>
        <option>created_at</option>
      </select>
      </div>
      <div>
      <label htmlFor="select-order" className="navbar-label">Order: </label>
      <select id="select-order" defaultValue="Select" onChange={(e) => handleFilterChange('order', e.target.value)}>
        <option></option>
        <option>asc</option>
        <option>desc</option>
      </select>
      </div>
  <div>
  <Button onClick={logOutAndReset} id="log-out-btn" className="read-more-btn"><span className="log-out-text">Log Out</span></Button>
  </div>
</div>
</nav>
        )
}

export default NavBar