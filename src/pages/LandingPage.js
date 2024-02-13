import React, { useEffect, useState } from 'react';
import './LandingPage.css'
import ReviewImage from '../images/landing-page-review.png'
import { Link } from 'react-router-dom';

function LandingPage() {
  const items = [
    'Waikato',
  ];  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = items.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };
  useEffect(() => {
    if(searchTerm == ''){
      setFilteredItems(items)
    }
  },[searchTerm])
  const [activeLinkIndex, setActiveLinkIndex] = useState(-1);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveLinkIndex((prev) => (prev + 1) % filteredItems.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveLinkIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        break;
      case 'Enter':
        if (activeLinkIndex !== -1 && filteredItems[activeLinkIndex]) {
          window.location.href = `/${filteredItems[activeLinkIndex]}`;
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="background"></div>
      <div id='landing-page-content'>
        <h1><span id='underline-title'>Rate</span> New Zealand University <span id='underline-title-second'>Courses</span></h1>
        <h2 id='landing-page-h2'>Read reviews for courses and get information from other students!</h2>
        <div id="search-container" data-placeholder={searchTerm == '' ? `Search for your University...`: ''}>
          <input id='landing-page-search'
          placeholder='Search for your University...'
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false);
            }, 150);
          }}
          style={{
            borderRadius: ( isFocused) ? '20px 20px 0 0' : '20px'
          }}        
          autoComplete="off"    
          onKeyDown={handleKeyDown}
          />
          { isFocused &&(
            <div className="dropdown">
              {filteredItems.map((item, index) => (
                  <Link 
                    key={item} 
                    to={`/${item}`} 
                    className={index === activeLinkIndex ? 'searchbar-link active' : 'searchbar-link'}
                    // onClick={() => console.log(`Trying to navigate to /${item}`)}
                  >
                    {item}
                  </Link>
            ))}
            </div>
          )}
        </div>
        <p id='social-proof'><b>20+</b> reviews already posted</p>
        <img id='landing-page-review-image' src={ReviewImage}></img>
      </div>
    </div>
  );
}

export default LandingPage;