import React from "react";
import "./AboutPage.css";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import EngineeringIcon from "@mui/icons-material/Engineering";

const AboutPage = () => {
  return (
    <div className="info-page-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-overlay">
          <h1>McNeese State University NSBE</h1>
          <p className="hero-subtitle">
            Proud Chapter of <strong>Region V "The Vanguard"</strong>
          </p>
          <div className="hero-badges">
            <span className="badge">Est. 1975 (National)</span>
            <span className="badge">Lake Charles, LA</span>
          </div>
        </div>
      </div>

      <div className="info-content">
        {/* The Mission Statement */}
        <section className="mission-section">
          <div className="mission-box">
            <h2>The Mission</h2>
            <p className="mission-text">
              "To increase the number of culturally responsible Black Engineers who excel
              academically, succeed professionally and positively impact the community."
            </p>
          </div>
        </section>

        {/* Region V Context */}
        <section className="region-section">
          <div className="region-text">
            <h3>We Are The Vanguard</h3>
            <p>
              McNeese State University is a proud member of <strong>Region V</strong>, which covers
              Texas, Louisiana, Arkansas, Oklahoma, Missouri, Iowa, North Dakota, South Dakota,
              Nebraska, and Kansas. Known as the "Vanguard Region," we are leaders in innovation and
              member participation.
            </p>
          </div>
        </section>

        {/* What We Do Grid */}
        <h2 className="section-header">What We Do</h2>
        <div className="pillars-grid">
          <div className="pillar-card">
            <SchoolIcon className="pillar-icon" />
            <h3>Academic Excellence</h3>
            <p>
              We host weekly study jams, maintain a test bank for engineering courses, and offer
              peer mentorship to ensure no member falls behind in their curriculum.
            </p>
          </div>
          <div className="pillar-card">
            <EngineeringIcon className="pillar-icon" />
            <h3>Professional Development</h3>
            <p>
              Prepare for the <strong>Fall Regional Conference (FRC)</strong> and
              <strong>National Convention</strong>. We provide resume reviews, mock interviews, and
              exclusive access to recruiters from top companies.
            </p>
          </div>
          <div className="pillar-card">
            <PublicIcon className="pillar-icon" />
            <h3>Community Outreach</h3>
            <p>
              We give back to Lake Charles through our "Walk for Education," STEM days at local high
              schools, and disaster relief volunteering efforts.
            </p>
          </div>
          <div className="pillar-card">
            <GroupsIcon className="pillar-icon" />
            <h3>The NSBE Family</h3>
            <p>
              More than an org, we are a family. From game nights to bowling socials, we ensure you
              have a support system away from home.
            </p>
          </div>
        </div>

        {/* The Torch Symbolism */}
        <section className="torch-section">
          <h3>The NSBE Torch</h3>
          <p>
            The NSBE Torch symbolizes our everlasting burning desire to achieve success in this
            competitive society and to effect a positive change in the quality of life of all
            people.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
