import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import React from 'react';  

function Collapsible({ children, initialCount = 9 }) {
  const [isHidden, setIsHidden] = useState(false);
  const [visibleCount, setVisibleCount] = useState(initialCount); 

  const childrenArray = React.Children.toArray(children);

  
  // Handle "Show More" functionality
  function showMoreArticles() {
    setVisibleCount((prevCount) => prevCount + initialCount); // Increase the visible count by initialCount
  }
//   function toggleIsHidden() {
//     setIsHidden(!isHidden);
//   }

  return (

        <>
        {childrenArray.slice(0, visibleCount)} {/* Show only the first `visibleCount` articles */}
  
      {visibleCount < childrenArray.length &&
       (
        <Button onClick={showMoreArticles} className='home-page-btn' >
          <span className='home-page-text'>Show More</span>
        </Button>
      )}
 </>
  );
}

export default Collapsible;
