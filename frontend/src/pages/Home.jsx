import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

        <h1>Learn Skills That Shape Your Future</h1>

        <p>
          Join thousands of learners and instructors on our
          Learning Management System.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Explore Courses
          </button>

          <button className="secondary-btn">
            Become Instructor
          </button>
        </div>

      </section>

        <section className="why-us">

            <h2>Why Choose Our LMS?</h2>

            <div className="why-grid">

                <div className="why-card">
                <h3>Expert Instructors</h3>
                <p>Learn from industry professionals.</p>
                </div>

                <div className="why-card">
                <h3>Practical Courses</h3>
                <p>Real-world projects and assignments.</p>
                </div>

                <div className="why-card">
                <h3>Certificates</h3>
                <p>Earn certificates after completion.</p>
                </div>

                <div className="why-card">
                <h3>Lifetime Access</h3>
                <p>Access your courses anytime.</p>
                </div>
            </div>
         </section>

      {/* Featured Courses */}
      <section className="featured-courses">

        <h2>Featured Courses</h2>

        <div className="course-grid">

          <div className="course-card">
            <h3>MERN Stack Development</h3>
            <p>
              Learn MongoDB, Express, React and Node.js.
            </p>
            <button>View Course</button>
          </div>

          <div className="course-card">
            <h3>Python for Data Science</h3>
            <p>
              Master Python, Pandas and Machine Learning.
            </p>
            <button>View Course</button>
          </div>

          <div className="course-card">
            <h3>Cyber Security</h3>
            <p>
              Learn ethical hacking and network security.
            </p>
            <button>View Course</button>
          </div>
                       
        </div>

      </section>

    <section className="stats-section">

  <div className="stat-card">
    <h2>5000+</h2>
    <p>Students</p>
  </div>

  <div className="stat-card">
    <h2>100+</h2>
    <p>Courses</p>
  </div>

  <div className="stat-card">
    <h2>50+</h2>
    <p>Instructors</p>
  </div>

  <div className="stat-card">
    <h2>95%</h2>
    <p>Success Rate</p>
  </div>

</section>

<section className="testimonials">

  <h2>What Our Students Say</h2>

  <div className="testimonial-grid">

    <div className="testimonial-card">
      <p>
        "The MERN course helped me land my first internship.
        The lessons were easy to follow and practical."
      </p>

      <h4>- Rahul Sharma</h4>
    </div>

    <div className="testimonial-card">
      <p>
        "Excellent instructors and well-structured content.
        I completed the Python course in just 2 months."
      </p>

      <h4>- Priya Patel</h4>
    </div>

    <div className="testimonial-card">
      <p>
        "The certificates and quizzes kept me motivated.
        Highly recommended platform."
      </p>

      <h4>- Aman Verma</h4>
    </div>

  </div>

</section>

<section className="instructor-cta">

  <div className="cta-content">

    <h2>Become an Instructor</h2>

    <p>
      Share your knowledge with thousands of learners
      around the world and build your teaching career.
    </p>

    <button className="cta-btn">
      Start Teaching Today
    </button>

  </div>

</section>

<footer className="footer">

  <div className="footer-container">

    <div className="footer-section">
      <h3>LMS</h3>
      <p>
        Empowering learners and instructors with
        quality online education.
      </p>
    </div>

    <div className="footer-section">
      <h3>Quick Links</h3>

      <ul>
        <li>Home</li>
        <li>Courses</li>
        <li>Login</li>
        <li>Register</li>
      </ul>
    </div>

    <div className="footer-section">
      <h3>Popular Courses</h3>

      <ul>
        <li>MERN Stack</li>
        <li>Python</li>
        <li>Cyber Security</li>
        <li>Data Science</li>
      </ul>
    </div>

    <div className="footer-section">
      <h3>Contact</h3>

      <p>Email: support@lms.com</p>
      <p>Phone: +91 9876543210</p>
      <p>India</p>
    </div>

  </div>

  <div className="footer-bottom">
    © 2026 LMS. All Rights Reserved.
  </div>

</footer>

    </div>
  );
}

export default Home;