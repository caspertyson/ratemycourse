import React, { useState } from 'react';
import './Courses.css'
import { Link, useParams } from 'react-router-dom';

function CourseReviewPage({courses}) {
    const { universityId } = useParams();
    const [numCoursesShow, setNumCoursesShow] = useState(18)

    function getColorBasedOnRating(rating) {
      const numRating = parseFloat(rating); // Convert the rating to a float
      // console.log(numRating)
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
  
  return (
    <div className="courses-container">
        <div className="courses-grid">
        {courses.slice(0, numCoursesShow).map(course => (
          <Link key={course.id} className="course-tile" to={`/${universityId}/${course.code}`}>
            <div id='code-overall-container'>
              <div><h3>{course.code}</h3></div>
              <div id='course-overall' style={{ backgroundColor: getColorBasedOnRating(course.averageScore === undefined ? 0 : course.averageScore) }}>
                <div>{course.averageScore === undefined ? '0.0' : course.averageScore}</div>
              </div>
            </div>
            <p>{course.title}</p>
            <span>
              {course.reviewCount ? 
                `${course.reviewCount} ${course.reviewCount === 1 ? "Review" : "Reviews"}` 
                : 
                "Add Review"}
            </span>
          </Link>
        ))}
      </div>
      {courses.length > 18 && courses.length > numCoursesShow ? 
      <div id='see-more-div'>
        <div onClick={() => setNumCoursesShow(numCoursesShow + 18)}>See more...</div>
      </div>
      :
      <></>
      }
    </div>
  );
}

export default CourseReviewPage;