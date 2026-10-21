import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./HeroSection.css";

const HeroSection = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Job Search:", {
      keyword,
      location,
    });
  };

  return (
    <section className="job-hero">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-7">
            <span className="hero-badge">
              <i className="fa-solid fa-briefcase me-2"></i>
              Your Career Starts Here
            </span>

            <h1 className="hero-title">
              Find Your <span>Dream Job</span>
              <br />
              Build Your Future.
            </h1>

            <p className="hero-description">
              Discover thousands of job opportunities from top companies.
              Take the next step toward your dream career today.
            </p>

            {/* Search Form */}
            <form className="job-search-form" onSubmit={handleSearch}>
              <div className="search-field">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Job title, keywords..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div className="search-divider"></div>

              <div className="search-field">
                <i className="fa-solid fa-location-dot"></i>
                <input
                  type="text"
                  placeholder="City or location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <button type="submit" className="search-btn">
                Search Jobs
              </button>
            </form>

            <div className="popular-searches">
              <strong>Popular:</strong>
              {["React Developer", "UI/UX Designer", "Marketing"].map(
                (job) => (
                  <button
                    type="button"
                    key={job}
                    onClick={() => setKeyword(job)}
                  >
                    {job}
                  </button>
                )
              )}
            </div>

            {/* Statistics */}
            <div className="hero-stats">
              <div>
                <h3>10K+</h3>
                <p>Active Jobs</p>
              </div>
              <div>
                <h3>5K+</h3>
                <p>Companies</p>
              </div>
              <div>
                <h3>20K+</h3>
                <p>Job Seekers</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-5">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85"
                alt="Professionals collaborating in an office"
                className="hero-image"
              />

              <div className="floating-card">
                <div className="floating-icon">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h6>Your next opportunity</h6>
                  <p>Could be one click away!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;