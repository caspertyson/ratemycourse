import React from 'react';

function About() {
  return (
    <div id='courses-page-container'>
        <div className="background"></div>
        <h2 id='request-title'>About</h2>
        <div id='request-container'>
            <div id='about-div'> 
            Here's something.
            <br></br><br></br>
            Last semester I took the <b>worst</b> elective.
            <br></br><br></br>
            I dreaded every  assignment. 
            <br></br><br></br>
            Every  lecture. 
            <br></br><br></br>
            Every  lab. 
            <br></br><br></br>
            <b>And yet...  I still had to pay $1,200 at the end of it.</b> 
            <br></br><br></br>
            I could have easily avoided this! <br></br>
            <h2>Hi, I'm a fourth year wanting to read and write reviews about university courses</h2> Hopefully to be read by other students, that are looking to avoid ending up in the same situation as I did.
            {/* <br></br><br></br> Feel free to email me for feature ideas, or anything else for that matter!  */}
            <br></br><br></br>This website is hosted on firebase so has minimal running costs, meaning I will endeavour to keep it up for as long as possible.
            <br></br><h3>The reviews are based on the following:</h3>
            <b>Usefulness</b><br></br>
            How useful the paper is perceived to be. 
            <br></br>Relevance to the real world.<br></br><br></br>
            <b>Easy</b><br></br>
            Helpful to adjust your workload when choosing extra-curricular papers.
            <br></br><br></br>
            <b>Interesting</b><br></br>
            Papers are much easier when the content is interesting.
            <br></br>But the opposite is so much more true!
            </div>
        </div>
    </div>
  );
}

export default About;