import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import CourseReviewsPage from './pages/CourseReviewPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RequestCourse from './pages/RequestCourse';
import RequestSchool from './pages/RequestSchool';
import About from './pages/About';
import Guidelines from './pages/Guidelines'
import Contact from './pages/Contact';
import VerifyReviews from './pages/VerifyReviews';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<VerifyReviews />} />
        <Route path="/request-course" element={<RequestCourse />} />
        <Route path="/request-school" element={<RequestSchool />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/:universityId" element={<CoursesPage />} />
        <Route path="/:universityId/:courseId/" element={<CourseReviewsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
