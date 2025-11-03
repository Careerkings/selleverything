import React from "react";
import "../cssfiles/footer.css";
import { FaFacebook, FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-container">
      <div className="footer-content">
        <div className="footer-about">
          <h3>SellEverything</h3>
          <p>
            Your one-stop shop for quality products at unbeatable prices. We
            deliver across the world — fast, safe, and secure! manged by Career
            Kings Consult, owned by Mr Damilare Adesina(A full stack Programmer
            and an Accountant)
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/Cart">Cart</a>
            </li>
            <li>
              <a href="/Profile">Profile</a>
            </li>
            <li>
              <a href="/Contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/careerkingsinstitute"
              target="_blank"
              rel="noopener norefferer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/damilare-adesina-54b130152?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://wa.me/2348105398413"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://github.com/Careerkings/selleverything"
              target="_blank"
              rel="noopener norefferer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} SellEverything. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
