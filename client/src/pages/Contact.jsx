import React from "react";
import "../cssfiles/contact.css";

const Contact = () => {
  const services = [
    {
      name: "Portfolio / Personal Website",
      price: "$150 – $300",
      naira: "₦255,000 – ₦510,000",
    },
    {
      name: "Business / Company Website",
      price: "$250 – $600",
      naira: "₦425,000 – ₦1,020,000",
    },
    {
      name: "E-Commerce Website",
      price: "$400 – $1,000+",
      naira: "₦680,000 – ₦1,700,000+",
    },
    {
      name: "Blog or News Website",
      price: "$200 – $500",
      naira: "₦340,000 – ₦850,000",
    },
    {
      name: "Educational / School Portal",
      price: "$500 – $1,200",
      naira: "₦850,000 – ₦2,040,000",
    },
    {
      name: "Real Estate Website",
      price: "$350 – $900",
      naira: "₦595,000 – ₦1,530,000",
    },
    {
      name: "Booking / Appointment Website",
      price: "$300 – $800",
      naira: "₦510,000 – ₦1,360,000",
    },
    {
      name: "Non-Profit / Church Website",
      price: "$150 – $400",
      naira: "₦255,000 – ₦680,000",
    },
    {
      name: "Landing Page or Marketing Page",
      price: "$100 – $250",
      naira: "₦170,000 – ₦425,000",
    },

    {
      name: "Fintech Platform (payments, KYC, payouts)",
      price: "$2,500 – $10,000+",
      naira: "₦4,250,000 – ₦17,000,000+",
    },
    {
      name: "User Wallet System (on-site wallet)",
      price: "$1,500 – $6,000",
      naira: "₦2,550,000 – ₦10,200,000",
    },
    {
      name: "Crypto Wallet / Exchange Integration",
      price: "$3,000 – $15,000+",
      naira: "₦5,100,000 – ₦25,500,000+",
    },
    {
      name: "Forex Trading Platform / Broker App",
      price: "$4,000 – $20,000+",
      naira: "₦6,800,000 – ₦34,000,000+",
    },
    {
      name: "Escrow Platform (payments held in escrow)",
      price: "$3,000 – $12,000+",
      naira: "₦5,100,000 – ₦20,400,000+",
    },
    {
      name: "SaaS Application (multi-tenant, billing)",
      price: "$3,000 – $12,000+",
      naira: "₦5,100,000 – ₦20,400,000+",
    },
    {
      name: "Broker / Trading Dashboard (charts, orders, positions)",
      price: "$3,000 – $18,000+",
      naira: "₦5,100,000 – ₦30,600,000+",
    },
  ];

  return (
    <div id="contact-container">
      <div className="contact-card">
        <h2>About Us</h2>
        <p className="contact-message">
          We’re here to help! Reach out to us anytime on WhatsApp.
        </p>
        <h3 className="contact-whatsapp">📱 +2348105398413</h3>
        <p className="contact-sub">
          We’re also available for your <strong>website development</strong>{" "}
          needs.
        </p>
        <a
          href="https://wa.me/2348105398413"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn"
        >
          Chat on WhatsApp
        </a>

        <div className="services-section">
          <h3>Services Offered</h3>
          <ul className="services-list">
            {services.map((service, idx) => (
              <li key={idx}>
                <span className="service-name">{service.name}</span>
                <span className="service-price">{service.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
