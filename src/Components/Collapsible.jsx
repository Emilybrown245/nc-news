import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import React from 'react';  

function Collapsible({ children, initialCount = 9 }) {
  const [visibleCount, setVisibleCount] = useState(initialCount); 

  const childrenArray = React.Children.toArray(children);

  function showMoreArticles() {
    setVisibleCount((prevCount) => prevCount + initialCount); 
  }


  return (
    <>
        {childrenArray.slice(0, visibleCount)} 
  
      {visibleCount < childrenArray.length &&
       (
        <Button onClick={showMoreArticles} className='home-page-btn' >
          <span className='home-page-text'>Show More</span>
        </Button>
      )}
 </>
  )
}

export default Collapsible;
