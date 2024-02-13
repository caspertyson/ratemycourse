import React, { useState, useEffect } from 'react';
import { db, auth } from '../index'; 

// Firebase Firestore Imports
import { collection, where, getDocs, doc, updateDoc, query } from "firebase/firestore";

// Firebase Auth Imports
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

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


function ReviewManager() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check user authentication status
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        fetchUnverifiedReviews(); // Fetch reviews once authenticated
      }
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  const fetchUnverifiedReviews = async () => {
    // const reviewRef = collection(db, 'reviews');
    // const q = where('approved', '==', false);
    // const snapshot = await getDocs(q);
    const reviewRef = collection(db, 'reviews');
    const q = where('approved', '==', false);
    const query1 = query(reviewRef, q);
    const snapshot = await getDocs(query1);
    


    const reviewData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setReviews(reviewData);
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  const handleVerify = async (reviewId) => {
    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, { approved: true });

    // Remove the reviewed item from the local state
    setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
  };

  // If not authenticated, display the login form
  if (!user) {
    return (
      <div>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
      </div>
    );
  }
  return (
    <div>
      {reviews.map(item => (
        <div key={item.id}>
            <div key={item.id} className='review-div'>
                <div id='first-review-div'>
                    <div id='overall-review-score' 
                    style={{ backgroundColor: getColorBasedOnRating(item.overall) }}>
                        {item.overall}
                    </div>
                    <div id='date-professor-div'>
                        <div id='review-date'>{item.date}</div>
                        <div id='review-professor'>Prof. {item.professor}</div>
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
                </div>
            </div>
            <p>{item.school}</p>
            <p>{item.code}</p>
            <p>{item.title}</p>
          <button onClick={() => handleVerify(item.id)}>Verify</button>
        </div>
      ))}
    </div>
  );
}

export default ReviewManager;
