import React from 'react';

const Contact = () => {
  return (
    <>
      <div className="inner_page contact_banner justify-content-center">
        <div className="container">
          <div className="row  text-center">
            <div className="col-lg-5">
              <div className="inner_content_title">
                <h2 className="title"> Contact Us </h2>
                <ul className="brdcrumb clearfix">
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li className="current"> Contact Us </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="contact-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h1 className="main-title text-left aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000">
                <span> Get In Touch </span>
              </h1>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-10">
                  <div className="sub-title aos-init" data-aos="fade-up" data-aos-duration="1000">
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aliquid veritatis quas optio aspernatur adipisci. </p>
                  </div>
                </div>
              </div>
              <form action="#" method="post" className="contact-form aos-init" data-aos="fade-up" data-aos-duration="1000">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="input-box">
                      <input type="text" className="form-control" placeholder="Name" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-box">
                      <input type="text" className="form-control" placeholder="Phone" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-box">
                      <input type="text" className="form-control" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-box">
                      <textarea className="form-control" placeholder="Your message"></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button type="submit" className="btn1">Send Message</button>
                  </div>
                </div>
              </form>
              {/* booking form  ends*/}
            </div>
            <div className="col-md-4">
              <ul className="contact">
                <li data-aos="fade-up" data-aos-duration="1000" className="aos-init">
                  <div className="icon">
                  <img src="assets/images/map.png" alt="" />
                  </div>
                  <p className="title">Address:</p>
                  <p className="mb-0"> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </li>
                <li data-aos="fade-up" data-aos-duration="1200" className="aos-init">
                  <div className="icon">
                   <img src="assets/images/phone.png" alt="" />
                  </div>
                  <p className="title">Call Us:</p>
                  <p> +000-00000000 </p>
                </li>
                <li data-aos="fade-up" data-aos-duration="2000" className="aos-init">
                  <div className="icon">
                  <img src="assets/images/email.png" alt="" />
                  </div>
                  <p className="title">Email Us:</p>
                  <p> info@Company.com </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div id="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.732703717269!2d4.889154711708158!3d52.35713304815898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609ed46fdfac5%3A0x3d6aca0730b99416!2sMarie%20Heinekenplein%201%2C%201072%20MH%20Amsterdam%2C%20Netherlands!5e0!3m2!1sen!2sin!4v1707292634811!5m2!1sen!2sin" width="100%" height="100%" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </>
  );
};

export default Contact;
