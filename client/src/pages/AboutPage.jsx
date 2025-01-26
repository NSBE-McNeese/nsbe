import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faMedal,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div>
      <div className="headband">
        <div className="heading">
          <h1>About Us</h1>
        </div>
      </div>

      <div className="container">
        <section className="whoweare">
          <div className="whoweare-image">
            <img src={require("./assets/found.jpeg")} alt="Who We Are" />
          </div>
          <div className="whoweare-text">
            <h2>Who We Are</h2>
            <p>
              The National Society of Black Engineers (NSBE) is a non-profit,
              student-governed organization that works to increase the
              representation of Black individuals in engineering and technology
              fields through advocacy, education and career advancement.
              Established in 1975 at Purdue University, NSBE has grown into one
              of the largest student-run organizations in the U.S.
            </p>
          </div>
        </section>

        <section className="mission">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              "To increase the number of culturally responsible Black Engineers
              who excel academically,
              <br /> succeed professionally, and positively impact the
              community."
            </p>
          </div>
        </section>

        <section className="mishcards">
          <div className="mishbox">
            <div className="excel">
              <img
                src={require("./assets/studj.jpg")}
                alt="Excel academically"
              />
              <p>Excel academically</p>
            </div>
          </div>

          <div className="mishbox">
            <div className="succeed">
              <img
                src={require("./assets/studj.jpg")}
                alt="Succeed professionally"
              />
              <p>Succeed professionally</p>
            </div>
          </div>

          <div className="mishbox">
            <div className="impact">
              <img
                src={require("./assets/elemen.jpg")}
                alt="Positively impact the community"
              />
              <p>Positively impact the community</p>
            </div>
          </div>
        </section>

        <section className="chapter">
          <div className="chapter-text">
            <h2>Our Chapter</h2>
            <p>
              Welcome to the McNeese Chapter of the National Society of Black
              Engineers! As a proud member of one of the largest
              student-governed organizations in the U.S., our chapter is
              committed to empowering Black students and professionals in
              engineering and technology disciplines. Located in Lake Charles,
              Louisiana and founded in 2018, our chapter strives to support,
              uplift, and guide the next generation of Black engineers toward
              their goals, creating a brighter and more diverse future in
              engineering.
            </p>
          </div>
          <div className="chapter-image">
            <img ssrc={require("./assets/chap.jpg")} alt="Our Chapter" />
          </div>
        </section>

        <section className="others">
          <div className="card">
            <div className="join">
              <h2>How To Join</h2>
              <FontAwesomeIcon
                icon={faIdBadge}
                style={{
                  fontSize: "71px",
                  color: "#FFD100",
                  marginRight: "50px",
                }}
              />
              <p>
                <i>Worldwide: </i>Visit nsbe.org, click <i>Join</i>, then choose
                the collegiate membership and fill out your information.
              </p>
            </div>
          </div>

          <div className="benef">
            <div className="card">
              <h2>Benefits of a Member</h2>
              <FontAwesomeIcon
                icon={faMedal}
                style={{
                  fontSize: "70px",
                  color: "#003087",
                  marginRight: "75px",
                }}
              />
              <p>
                Networking opportunities,
                <br /> Professional development,
                <br /> Academic Support,
                <br /> Community and Support,
                <br /> <i>and many more.</i>
              </p>
            </div>
          </div>

          <div className="know">
            <div className="card">
              <h2>Did You Know?</h2>
              <FontAwesomeIcon
                icon={faQuestion}
                style={{
                  fontSize: "70px",
                  color: "#FFD100",
                  marginRight: "75px",
                }}
              />
              <p>
                <i>Worldwide: </i>35000+ members
                <br />
                <i>Our Chapter: </i>14 registered members
              </p>
            </div>
          </div>
        </section>

        <section className="testim">
          <div className="test-container">
            <div className="up">
              <h2>Testimonials</h2>
            </div>
            <div className="down">
              <p>
                We are proud of our chapter's success and the incredible support
                we've received. Our members have shown that they are committed
                to their goals and that their efforts are making a difference.
                -Chidera
              </p>
            </div>
          </div>
        </section>

        <div className="gallery-header">
          <h2>Gallery</h2>
        </div>
        <div className="gallery">
          <img src={require("./assets/gallone.jpg")} alt="Gallery Image 1" />
          <img src={require("./assets/img31.JPG")} alt="Gallery Image 2" />
          <img src={require("./assets/gallthree.jpg")} alt="Gallery Image 3" />

          <button className="seemore">
            See More
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        <div className="footer">
          <div className="footer-us">
            <h2>Contact Us</h2>
            <a href="#">
              <FontAwesomeIcon
                icon={["fab", "instagram"]}
                style={{ fontSize: "45px" }}
              />
            </a>
            <p>@mcneese.nsbe</p>
            <a href="#">
              <FontAwesomeIcon
                icon={["fab", "linkedin"]}
                style={{ fontSize: "45px" }}
              />
            </a>
            <p>@mcneese.nsbe</p>
            <a href="#">
              <FontAwesomeIcon
                icon={["far", "envelope"]}
                style={{ fontSize: "45px" }}
              />
            </a>
          </div>

          <div className="footer-form">
            <h2>Contact Form</h2>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Phone Number" />
            <input type="text" placeholder="Message" />
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
