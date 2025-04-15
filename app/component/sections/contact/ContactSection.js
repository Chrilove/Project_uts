'use client';

import { useState, useEffect } from 'react';
import CommentSection from '../../../utils/commentSection/commentSection';
import { submitContactForm } from "../../../utils/contactForm/contactForm";
import FloatingBubbles from '../../effects/FloatingBubbles'
import BouncingBubbles from '../../effects/BouncingBubbles'
import './ContactSection.css'; 

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentsList, setCommentsList] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
  
    // Hapus validasi rating dan komentar, langsung kirim form meskipun kosong
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
  
    try {
      // Kirim komentar (jika ada) ke API
      if (message) {  
        const data = await res.json();
        setCommentsList((prev) => [...prev, data.comment]);
        setMessage(''); // Clear message
        setRating(0); // Reset rating
      }
  
      // Kirim form kontak
      const result = await submitContactForm(formData);
  
      if (result.success) {
        alert("Message sent successfully!");
        e.target.reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  

  return (
    <section className="contact-section full-bg-section" id="contact">
      {isClient && (
    <>
      <BouncingBubbles />
      <FloatingBubbles />
      <BouncingBubbles />
    </>
  )}
      <div className="container position-relative">
        <h2 className="text-center contact-title">Send Me a Message</h2>
        <div className="row">
      {/* Contact Form Column */}
      <div className="col-lg-6 mb-4">
        <div className="contact-form animate-on-scroll">
          <h3 className="mb-4 contact-section-title">Contact Me <span className="fs-3">✨</span></h3>
          <form onSubmit={handleContactSubmit}>
            <div className="mb-3 contact-sub-title">
              <input name="name" type="text" className="form-control" placeholder="Your Name" required />
            </div>
            <div className="mb-3 contact-sub-title">
              <input name="email" type="email" className="form-control" placeholder="Your Email" required />
            </div>
            <div className="mb-3 contact-sub-title">
              <textarea
                name="message"
                className="form-control"
                rows="5"
                placeholder="Cast Your Message Here..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-candy contact-subtitle">
              <i className="bi bi-send-hearts me-2 contact-subtitle"></i>Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Contact Info Column */}
      <div className="col-lg-6">
      <div className="contact-info animate-on-scroll reset-animation"></div>
        <div className="animate-on-scroll fade-in-left">
          <div className="contact-info">
            <h3 className="mb-4 text-center contact-title">Contact Details <span className="fs-3">✨</span></h3>
            
            {/* Location */}
            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div>
                <h5 className="contact-sub-title">My Location</h5>
                <p className="contact-subtitle">Majalaya, Bandung, Indonesia</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-envelope-paper-heart-fill"></i>
              </div>
              <div>
                <h5 className="contact-sub-title">Email Address</h5>
                <p className="contact-subtitle">chrilove@gmail.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div>
                <h5 className="contact-sub-title">Phone Number</h5>
                <p className="contact-subtitle">+62 895 3308 76559</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Comment Section Component */}
    <div className="row mt-4">
    <main>
      <h1 className="text-center my-4 animate-on-scroll contact-section-title">Leave a Comment & Rating</h1>
      <CommentSection />
    </main>
    </div>
  </div>

    {/* Socials */}
     <div className="mt-5">
        <div className="d-flex justify-content-center mt-3 contact-sub-title">
           <a href="https://twitter.com/" className="social-btn"><i className="bi bi-twitter"></i></a>
           <a href="https://www.instagram.com/" className="social-btn"><i className="bi bi-instagram"></i></a>
           <a href="https://id.linkedin.com/" className="social-btn"><i className="bi bi-linkedin"></i></a>
           <a href="https://github.com/Chrilove" className="social-btn"><i className="bi bi-github"></i></a>
         </div>
    </div>
</section>
 );
}