import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="welcome-container">
        <div className="overlay">
          <h1>Welcome to</h1>
          <h2>Restaurant Management System</h2>
          <p>
            Streamline your restaurant operations and enhance customer
            experience.
          </p>
          <Link className="get-started-button" to={"/super-admin/login"}>Get Started</Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
