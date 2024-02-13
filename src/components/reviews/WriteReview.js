import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './WriteReview.css'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../index'; // Adjust the path to your index.js file accordingly
import allcourses from '../../data/waikatoCourses.json'


const Star = ({ isFilled, handleHover, handleHoverOut, handleClick }) => (
  <span 
    onMouseOver={handleHover}
    onMouseOut={handleHoverOut}
    onClick={handleClick}
    style={{ display: 'inline',cursor: 'pointer', color: isFilled ? 'gold' : 'rgb(223, 223, 223)' }}
    id='stars'
  >
    ★
  </span>
);

const findTitleByCode = (code) => {
  const course = allcourses.find(course => course.code === code);
  return course ? course.title : null;
}


function WriteReview() {
    const { universityId, courseId } = useParams();
    const [rating, setRating] = useState(0);
    const [usefulRating, setUsefulRating] = useState(0);
    const [usefulHoverRating, setUsefulHoverRating] = useState(0);
    const [easyRating, setEasyRating] = useState(0);
    const [easyHoverRating, setEasyHoverRating] = useState(0);
    const [interestingRating, setInterestingRating] = useState(0);
    const [interestingHoverRating, setInterestingHoverRating] = useState(0);
    const [professor, setProfessor] = useState('')
    const [review, setReview] = useState('')
    const [online, setOnline] = useState('No')
    const [year, setYear] = useState('2023')
    const [workload, setWorkload] = useState('Medium')
    const [grade, setGrade] = useState('-')
    const courseDescr = findTitleByCode(courseId);
    console.log(courseDescr)
    console.log(courseId)

    const submitReview = () => {
      var today = new Date();
      const formattedDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

      if (
          usefulRating === 0 || 
          easyRating === 0 || 
          interestingRating === 0 || 
          professor === '' || 
          review === '' || 
          universityId === null || 
          courseId === null || 
          formattedDate === null
      ) {
          window.alert("Please fill in all of the feilds!");
          return
      } else {
          console.log(usefulRating, easyRating, interestingRating, professor, review, online, workload, grade, universityId, courseId, formattedDate);
          const newReview = {
            code: courseId,
            date: (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear(),
            easy: easyRating,
            grade: grade,
            interesting: interestingRating,
            online: online,
            overall: Number(((easyRating + interestingRating + usefulRating) / 3).toFixed(1)),
            professor: professor,
            review: review,
            school: universityId,
            title: courseDescr,
            useful: usefulRating,
            workload: workload,
            year:year,
            approved: false
        };
    
        addDoc(collection(db, 'reviews'), newReview)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                window.alert("Thank you for your review!");
                setProfessor('');               // Reset professor
                setReview('');                  // Reset review
                setOnline('No');                // Reset online dropdown
                setWorkload('Medium');          // Reset workload dropdown
                setGrade('-');                  // Reset grade dropdown
                setUsefulRating(0)
                setEasyRating(0)
                setInterestingRating(0)
                setYear("2023")
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
          }
    }

  return (
    <div className="write-reviews-container">
      <h2 id='write-review-title'>Write Review</h2>
      <div id='write-review-div'>
        <div id='star-ratings'>
          <div id='star-div'>
          <div>Useful:</div>
          <div id='usefulness-star'>
          {[1, 2, 3, 4, 5].map((starRating) => (
            <Star
              key={starRating}
              isFilled={usefulHoverRating ? starRating <= usefulHoverRating : starRating <= usefulRating}
              handleHover={() => setUsefulHoverRating(starRating)}
              handleHoverOut={() => setUsefulHoverRating(0)}
              handleClick={() => setUsefulRating(starRating)}
            />
          ))}
          </div>
          </div>
          <div id='star-div'>
          <div>Easy:</div>
          <div id='usefulness-star'>
          {[1, 2, 3, 4, 5].map((starRating) => (
            <Star
              key={starRating}
              isFilled={easyHoverRating ? starRating <= easyHoverRating : starRating <= easyRating}
              handleHover={() => setEasyHoverRating(starRating)}
              handleHoverOut={() => setEasyHoverRating(0)}
              handleClick={() => setEasyRating(starRating)}
            />
          ))}
          </div>
          </div>
          <div id='star-div'>
            <div>Interesting:</div>
            <div id='usefulness-star'>
            {[1, 2, 3, 4, 5].map((starRating) => (
              <Star
                key={starRating}
                isFilled={interestingHoverRating ? starRating <= interestingHoverRating : starRating <= interestingRating}
                handleHover={() => setInterestingHoverRating(starRating)}
                handleHoverOut={() => setInterestingHoverRating(0)}
                handleClick={() => setInterestingRating(starRating)}
              />
            ))}
            </div>
          </div>
        </div>
        <div id='review-inputs'>
          <div>
          <label>Lecturer/s:</label>
          <input
          className='review-professor'
          value={professor}
          onChange={e => setProfessor(e.target.value)}
          maxLength={50} // Character limit
          />
          <label id='year'>Year: </label>
            <select id="online-select" value={year} onChange={e => setYear(e.target.value)}>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <label>Share Your Experiences:</label>
          <textarea
          placeholder='Advice for others...'
          className='review-experiences'
          value={review}
          maxLength={2000} // Character limit
          onChange={e => setReview(e.target.value)}
          />
          <div id='select-options'>
            <div>
              <div>Online:</div>
              <select id="online-select" value={online} onChange={e => setOnline(e.target.value)}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div>
              <div>Workload:</div>
              <select id="online-select" value={workload} onChange={e => setWorkload(e.target.value)}>
                <option value="Heavy">Heavy</option>
                <option value="Medium">Medium</option>
                <option value="Light">Light</option>
              </select>
            </div>
            <div>
              <div>Grade:</div>
              <select id="online-select" value={grade} onChange={e => setGrade(e.target.value)}>
                <option value="-">-</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="D-">D-</option>
                <option value="E+">E+</option>
                <option value="E">E</option>
                <option value="E-">E-</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div id='submit-div'>
            <div onClick={submitReview}>
              Submit
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteReview;
