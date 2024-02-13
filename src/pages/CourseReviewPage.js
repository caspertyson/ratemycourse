import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CourseReviewPage.css'
import Reviews from '../components/reviews/Reviews'
import WriteReview from '../components/reviews/WriteReview';
import WriteIcon from '../images/writeIcon-removebg-preview.png'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { Link } from 'react-router-dom';
import allcourses from '../data/waikatoCourses.json'

function getColorBasedOnRating(rating) {
  const numRating = parseFloat(rating); // Convert the rating to a float
  if (numRating == 0) {
    return '#778899';
  } else if (numRating <= 2) {
      return '#F14E37';
  } else if (numRating > 2.5 && numRating <= 3.5) {
    return '#FF8B02';
  }else {
      return '#45B171';
  }
}

const findTitleByCode = (code) => {
  const course = allcourses.find(course => course.code === code);
  return course ? course.title : null;
}



function CourseReviewPage() {
  const { universityId, courseId } = useParams();
  const [usefullnessRating, setUsefulnessRating] = useState(0); // Replace with the actual value or state
  const [easinessRating, setEasinessRating] = useState(0);    // Replace with the actual value or state
  const [interestingRating, setInterestingRating] = useState(0); // Replace with the actual value or state
  const [position, setPosition] = useState('Date');
  const reviewRef = useRef(null);
  const [reviews, setReviews] = useState([])
  const [noReviews, setNoReviews] = useState(false)
  const courseDescr = findTitleByCode(courseId);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchReviews = async () => {
        const db = getFirestore();
        const reviewCollection = collection(db, 'reviews');

        const q = query(
          reviewCollection, 
          where("code", "==", courseId),
          where("approved", "==", true)
      );
              
        const reviewSnapshot = await getDocs(q);
        const reviewList = reviewSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // console.log(reviewSnapshot);  
        setReviews(reviewList)

        const arrayCourses = {};

        reviewList.forEach(review => {
          const { useful, easy, interesting, code } = review;
          
          if (!arrayCourses[code]) {
            arrayCourses[code] = {
              totalUseful: 0,
              totalEasy: 0,
              totalInteresting: 0,
              reviewCount: 0
            };
          }
      
          arrayCourses[code].totalUseful += useful;
          arrayCourses[code].totalEasy += easy;
          arrayCourses[code].totalInteresting += interesting;
          arrayCourses[code].reviewCount += 1;
        });

        if (arrayCourses && arrayCourses[courseId]) {
          setUsefulnessRating((arrayCourses[courseId].totalUseful / arrayCourses[courseId].reviewCount).toFixed(1))
          setEasinessRating((arrayCourses[courseId].totalEasy / arrayCourses[courseId].reviewCount).toFixed(1))
          setInterestingRating((arrayCourses[courseId].totalInteresting / arrayCourses[courseId].reviewCount).toFixed(1))
        }else{
          setNoReviews(true)
        }
    };

    fetchReviews();
  }, []);

  const handleButtonClick = () => {
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  function stringToDate(dateString) {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  }

  const handleClick = (pos) => {
    if(pos == 'Positive'){
      setReviews(reviews.sort((a, b) => b.overall - a.overall))
    }else if(pos == 'Negative'){
      setReviews(reviews.sort((a, b) => a.overall - b.overall))
    }else{
      setReviews(reviews.sort((a, b) => stringToDate(b.date) - stringToDate(a.date)))
    }
    setPosition(pos);
  };

  const getSliderPosition = () => {
    switch (position) {
      case 'Positive':
        return 'translateX(0px)';
      case 'Negative':
        return 'translateX(90px)';
      default:
        return 'translateX(-90px)';
    }
  };

  return (
    <div id='courses-page-container'>
      <div className="background"></div>
      <div id='back-link-div'>
        {/* <Link 
          key={universityId} 
          to={`/${universityId}`} 
          id='back-link'
          >
          {`< Back`}
        </Link> */}
        <span id='back-link' onClick={() => window.history.back()}>
        {`< Back`}
        </span>
      </div>

      <h1 id='uni-id-reviews'>
        {courseId}
      </h1>
      <h2 id='course-description-review'>{courseDescr}</h2>
      {
        noReviews ? 
        <>
            <p><i>Be the first to add a review</i></p>
          <br></br>
        </>
        :
        <>
        <div>
          
        </div>
          <span id='overall-ratings'>
            <span className='rating-number'>
              <div 
                id='overall-ratings-individual' 
                style={{ backgroundColor: getColorBasedOnRating(usefullnessRating) }}
              >
                {usefullnessRating}
              </div>
              <div id='rating-name'>
              Useful
              </div>
            </span>
            <span className='rating-number'>
                <div 
                  id='overall-ratings-individual' 
                  style={{ backgroundColor: getColorBasedOnRating(easinessRating) }}
                >
                  {easinessRating}
                </div>
                <div id='rating-name'>
                Easy
                </div>
            </span>
            <span className='rating-number'>
                <div 
                  id='overall-ratings-individual' 
                  style={{ backgroundColor: getColorBasedOnRating(interestingRating) }}
                >
                  {interestingRating}
                </div>
                <div id='rating-name'>
                Interesting
                </div>
            </span>
          </span>
          <div id='sort-by-text'>
            Sort By
          </div>
          <div className='slider-container'>
            <div 
              className="slider" 
              style={{ transform: getSliderPosition() }}
            >
              {position}
            </div>
            <div className="option" onClick={() => handleClick('Date')}>Date</div>
            <div className="option" onClick={() => handleClick('Positive')}>Positive</div>
            <div className="option" onClick={() => handleClick('Negative')}>Negative</div>
          </div>

          <div id='write-review-button' onClick={handleButtonClick}>
            <div >
              Leave A Review
            </div>
            <img id='write-icon' src={WriteIcon}></img>
          </div>
          <Reviews reviews={reviews}/>
        </>
      }

      <div id='write-review-component-container' ref={reviewRef}>
        <WriteReview />
      </div>
    </div>
  );
}

export default CourseReviewPage;