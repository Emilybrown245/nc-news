import {useNavigate, useLocation} from 'react-router-dom'


function NavBar () {
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
  

    return(
<div>
  <div>
    <label htmlFor="topic-dropdown">Select a topic: </label>
      <select id="topic-dropdown" defaultValue="Select" onChange={(e) => handleFilterChange('topic', e.target.value)}>
        <option>Select</option>
        <option>coding</option>
        <option>football</option>
        <option>cooking</option>
      </select>
      </div>
      <div>
      <label htmlFor="sort-dropdown">Sort: </label>
      <select id="sort-dropdown" defaultValue="Sort" onChange={(e) => handleFilterChange('sort_by', e.target.value)}>
        <option>Sort</option>
        <option>comment_count</option>
        <option>votes</option>
        <option>created_at</option>
      </select>
      </div>
      <div>
      <label htmlFor="order-dropdown">Order: </label>
      <select id="order-dropdown" defaultValue="Select" onChange={(e) => handleFilterChange('order', e.target.value)}>
        <option>Order</option>
        <option>asc</option>
        <option>desc</option>
      </select>
      </div>
</div>
        )
}

export default NavBar