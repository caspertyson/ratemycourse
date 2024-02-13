import React, { useState } from 'react';
import './Request.css'
function RequestCourse() {
    const [email, setEmail] = useState('')
    const [school, setSchool] = useState('')
    const [course, setCourse] = useState('')

    const submitSchool = () => {
      if(school == ""  || email == "" || course == ""){
        window.alert("Please enter all feilds!")
      }else{
        setSchool('')
        setEmail('')
        setCourse('')
        window.alert("Thank you for your submission")
      }
    }

  return (
    <div id='courses-page-container'>
        <div className="background"></div>
        <h2 id='request-title'>Request A Course</h2>
        <div id='request-container'>
            <div>Enter Your Email:</div>
            <input id='request-input'
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            <div>Enter Course Code:</div>
            <input id='request-input'
            value={school}
            onChange={e => setSchool(e.target.value)}
            />
            <div>Enter Course Title:</div>
            <input id='request-input'
            value={course}
            onChange={e => setCourse(e.target.value)}
            />
            <div id='submit-request'>
            <div onClick={submitSchool}>
              Submit
              </div>
            </div>
        </div>
    </div>
  );
}

export default RequestCourse;