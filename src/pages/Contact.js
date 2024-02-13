import React, { useState } from 'react';

function Contact() {
    const [email, setEmail] = useState('')
    const [school, setSchool] = useState('')

    const submitSchool = () => {
        if(school == ""  || email == ""){
            window.alert("Please enter all feilds!")
        }else{
            setSchool('')
            setEmail('')
            window.alert("Thank you for your submission")
        }
    }
  return (
    <div id='courses-page-container'>
        <div className="background"></div>
        <h2 id='request-title'>Contact Us</h2>
        <div id='request-container'>
            <div>Enter Your Email:</div>
            <input id='request-input'
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            <div>Your Message:</div>
            <textarea id='message-input'
            value={school}
            onChange={e => setSchool(e.target.value)}
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

export default Contact;