import React from 'react';
import { Link } from 'react-router-dom'; 

const UserBanner = () => {
    return (
        <>
            <div className="banner">
                <div className="container">
                    <div className="row g-4 align-items-center justify-content-between">
                        <div className="col-lg-7">
                            <div className="banner_heading aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
                                <h1>Enjoy Your Eating Time With Chefmaster</h1>

                                <div className="btn_sec">
                                    <Link to="/menu" className="btn1">VIEW OUR MENU</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserBanner;
