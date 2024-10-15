import React, { useEffect, useState } from 'react';

const BackToTop = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const toggleHeight = window.outerHeight * 2;

    const handleScroll = () => {
      if (window.scrollY > toggleHeight) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`m-backtotop ${isActive ? 'active' : ''}`} aria-hidden="true" onClick={handleBackToTopClick}>
      <div className="arrow">
        <img src="assets/images/up-arrow1.png" alt="" />
      </div>
      <div className="text"> Back to top </div>
    </div>
  );
};

export default BackToTop;
