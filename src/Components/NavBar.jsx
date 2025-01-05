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
          sessionStorage.clear(); 
          document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
          setUser({ name: "", loggedIn: false });
  
          navigate("/");
      };

    return(
      <nav>
<div className="navbar-container">
  <div className='dropdown-group'>
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
      </div>
  <div className="button-container">
  <Button onClick={logOutAndReset} className="log-out-btn"><span className="log-out-btn-text">Log Out</span></Button>
  </div>
</div>
</nav>
        )
}

export default NavBar