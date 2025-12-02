import React from "react";
import BooksImage2 from "../images/Images2.png";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-content">
        {/* LEFT IMAGE */}
        <div className="contact-left">
          <img
            src={BooksImage2}
            alt="Contact Illustration"
            className="contact-image"
          />
        </div>

        {/* RIGHT FORM */}
        <form className="contact-form">
          <h3 className="contact-subtitle">We Would Love To Hear From You.</h3>

          <p className="contact-note">
            Your email address will not be published. Required fields are marked
            *
          </p>

          <input type="text" className="contact-input" placeholder="Name *" />

          <input type="email" className="contact-input" placeholder="Email *" />

          <textarea
            rows="5"
            className="contact-textarea"
            placeholder="Message"
          ></textarea>

          <label className="contact-checkbox">
            <input type="checkbox" /> Save my information for next time.
          </label>

          <button type="submit" className="contact-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
