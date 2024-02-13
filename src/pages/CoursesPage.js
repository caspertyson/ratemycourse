import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CoursesPage.css'
import Courses from '../components/courses/Courses'
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import allcourses from '../data/waikatoCourses.json'

function CoursesPage() {
  const { universityId } = useParams();
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const tempTitle = "University of " + universityId

  const title = tempTitle.split(' ');
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true); // start loading

      const db = getFirestore();
      // const reviewCollection = collection(db, 'reviews');
      // const reviewSnapshot = await getDocs(reviewCollection);
      const reviewCollection = collection(db, 'reviews');
      const q = query(reviewCollection, where('approved', '==', true));
      const reviewSnapshot = await getDocs(q);
  
      const reviewList = reviewSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // console.log(allcourses)  

      const arrayCourses = {};

      reviewList.forEach(review => {
        const { code, title, overall } = review;
        
        if (!arrayCourses[code]) {
          arrayCourses[code] = {
            title: title,
            totalScore: 0,
            reviewCount: 0
          };
        }
    
        arrayCourses[code].totalScore += overall;
        arrayCourses[code].reviewCount += 1;
      });
      // console.log(arrayCourses)

      const newCourseArray = Object.keys(arrayCourses).map(code => {
        const { title, totalScore, reviewCount } = arrayCourses[code];
        return {
          code,
          title,
          averageScore: reviewCount == 0 ? 79 : (totalScore / reviewCount).toFixed(1),
          reviewCount
        };
      });
      // console.log(newCourseArray)

      let mergedArray = newCourseArray.concat(allcourses.filter(course => 
        !newCourseArray.some(newCourse => newCourse.code === course.code)
      ));
    
      setCourses(mergedArray)
      setIsLoading(false); // end loading

    };
    fetchReviews();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(courses);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('level');
  const inputRef = useRef(null);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = courses.filter(item =>
        item.code.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };
  const [fade, setFade] = useState('in');

  useEffect(() => {
    if(searchTerm == ''){
      setFilteredItems(courses.concat(allcourses))
    }
  },[searchTerm])

  useEffect(() => {
    setFilteredItems(courses.concat(allcourses))
  },[courses])

  useEffect(() => {
    // window.scrollTo(0, 0);
    const intervalId = setInterval(() => {
      // fade out first
      setFade('out');

      setTimeout(() => {
        setPlaceholderText((prevText) => {
          switch (prevText) {
            case 'code':
              return 'level';
            case 'level':
              return 'department';
            default:
              return 'code';
          }
        });
        setFade('in');
      }, 300); // corresponds to the transition time set in the CSS
    }, 2500);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
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
          window.location.href = `/${universityId}/${filteredItems[activeLinkIndex].code}}`;
        }else{
          inputRef.current.blur();
        }
        break;
      default:
        break;
    }
  };
  
  return (
    <div id='courses-page-container'>
      <div className="background"></div>
      <h1 id='uni-id-courses'>
      {title.map((word, index) => 
                index === title.length - 1 ? 
                <span key={index} style={{color: '#017396'}}>{word}</span> : 
                word + ' '
            )}
      </h1>
      <div id="search-container" data-placeholder={searchTerm == '' ? `Search for your paper ${placeholderText}...`: ''} className={fade === 'out' ? 'fade-out' : ''}>
        <input id='landing-page-search'
          placeholder={`Search for your paper ${placeholderText}...`}
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false);
            }, 150);
          }}
          onKeyDown={handleKeyDown}
          style={{
            borderRadius: (isFocused) ? '20px 20px 0 0' : '20px'
          }}      
          ref={inputRef} 
          autoComplete="off"      
        />
        {isFocused && (
          <div className="dropdown">
            {filteredItems.slice(0, 5).map((item, index) => (
                <Link 
                  key={item.code} 
                  to={`/${universityId}/${item.code}`} 
                  className={index === activeLinkIndex ? 'searchbar-link active' : 'searchbar-link'}
                  >
                  {item.code}
                </Link>
          ))}
          </div>
        )}
      </div>
      <div id='courses-div'>
        {isLoading && <p className="loading">Loading...</p>}
        <Courses courses={filteredItems}/>
      </div>
    </div>
  );
}

export default CoursesPage;
