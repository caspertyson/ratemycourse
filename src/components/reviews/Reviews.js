import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Reviews.css'

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

function Reviews({reviews}) {
    const { universityId, courseId } = useParams();
    
    
  return (
    <div className="reviews-container">
        {reviews.map((item, index) => (
            <div key={item.id} className='review-div'>
                <div id='first-review-div'>
                    <div id='overall-review-score' 
                    style={{ backgroundColor: getColorBasedOnRating(item.overall) }}>
                        {item.overall}
                    </div>
                    <div id='date-professor-div'>
                        <div id='review-date'>{item.date}</div>
                        <div id='review-professor'>{item.professor}</div>
                    </div>
                </div>
                <div id='review-content-div'>
                    {item.review}
                </div>
                <div id='ratings-div'>
                    <div id='ratings-div-scores'>
                        <div id='detail-review-score' 
                        style={{ backgroundColor: getColorBasedOnRating(item.useful) }}>
                            {item.useful}
                        </div><span id='detail-review-name'>Useful</span>
                    </div>
                    <div id='ratings-div-scores'>
                        <div id='detail-review-score' 
                        style={{ backgroundColor: getColorBasedOnRating(item.easy) }}>
                            {item.easy}
                        </div><span id='detail-review-name'>Easy</span>
                    </div>
                    <div id='ratings-div-scores'>
                        <div id='detail-review-score' 
                        style={{ backgroundColor: getColorBasedOnRating(item.interesting) }}>
                            {item.interesting}
                        </div><span id='detail-review-name'>Interesting</span>
                    </div>
                </div>
                <div id='other-review-notes'>
                    <span>Workload: <b>{item.workload}</b></span>
                    <span>Online: <b>{item.online}</b></span>
                    <span>Grade: <b>{item.grade}</b></span>
                    <span>Year: <b>{item.year == null ? "2023" : item.year}</b></span>
                </div>
            </div>
        ))}
    </div>
  );
}

export default Reviews;
