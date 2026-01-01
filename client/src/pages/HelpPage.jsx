import React from "react";
import "./info_pages.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import EmailIcon from "@mui/icons-material/Email";
import PaymentIcon from "@mui/icons-material/Payment";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const HelpPage = () => {
  return (
    <div className="info-page-container">
      {/* Header */}
      <div className="page-header">
        <h1>
          Help Center
          <HelpOutlineIcon className="icon-green" sx={{ fontSize: "2.5rem" }} />
        </h1>
      </div>

      {/* Top Stats Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <h2>Support Contact</h2>
          <p className="stat-value" style={{ fontSize: "1.4rem" }}>
            nsbe@mcneese.edu
          </p>
        </div>
        <div className="stat-card" style={{ borderLeftColor: "#FFD700" }}>
          <h2>Chapter Dues</h2>
          <p className="stat-value" style={{ color: "#d4af37" }}>
            $McNeeseNSBE
          </p>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="content-split">
        {/* Left: QR Guide */}
        <div className="main-column">
          <h2 className="section-title">
            How to Earn Points <QrCodeScannerIcon className="icon-green" />
          </h2>

          <div className="step-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Register Online</h3>
                <p>
                  Always go to the <strong>Events Tab</strong> and click "Register" before the event
                  starts. This creates your ticket.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Get Your Code</h3>
                <p>
                  Your unique QR code will appear in your dashboard. You can screenshot it or open
                  it on your phone.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Scan at the Door</h3>
                <p>
                  Find the Membership Chair at the entrance. They will scan your phone, and points
                  are added instantly!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: FAQ */}
        <div className="side-column">
          <div className="side-header">
            <h2>
              <VerifiedUserIcon /> Common Questions
            </h2>
          </div>
          <div className="side-content">
            <div className="info-list">
              <div className="info-item">
                <EmailIcon className="info-icon" />
                <div className="info-text">
                  <h3>Forgot to scan?</h3>
                  <p>Email the secretary within 24 hours. Retroactive points are rarely given!</p>
                </div>
              </div>

              <div className="info-item">
                <PaymentIcon className="info-icon" />
                <div className="info-text">
                  <h3>Paying Dues?</h3>
                  <p>We accept CashApp ($McNeeseNSBE) or cash at any General Body Meeting.</p>
                </div>
              </div>

              <div className="info-item">
                <HelpOutlineIcon className="info-icon" />
                <div className="info-text">
                  <h3>Non-Majors?</h3>
                  <p>Yes! We welcome Computer Science, Math, Chemistry, and all STEM majors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
