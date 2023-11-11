import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="entire-landing-page">
      <h1 className="landing-header">Welcome to oKdrama!</h1>
      <div className="slideshow-container">
        <div
          className="slideshow"
          style={{ display: slideIndex === 0 ? "block" : "none" }}
        >
          <NavLink className="slideshow-navlink" to="/dramas/2">
            <div classname="slideshow-pls">
              <div className="slideshow-number"> {slideIndex + 1} / 4</div>
              <img
                className="slideshow-gif"
                src={process.env.PUBLIC_URL + `/images/bokjoo.gif`}
                alt={`Slide ${slideIndex + 1}`}
              />
              <div className="slideshow-div">
                <div className="slideshow-caption">
                  Weightlifting Fairy Kim Bok-joo
                </div>
              </div>
            </div>
          </NavLink>
        </div>
        <div
          className="slideshow"
          style={{ display: slideIndex === 1 ? "block" : "none" }}
        >
          <NavLink className="slideshow-navlink" to="/dramas/1">
            <div className="slideshow-number"> {slideIndex + 1} / 4</div>
            <img
              className="slideshow-gif"
              src={process.env.PUBLIC_URL + `/images/bongsoon.gif`}
              alt={`Slide ${slideIndex + 1}`}
            />
            <div className="slideshow-div">
              <div className="slideshow-caption">Strong Woman Do Bong-soon</div>
            </div>
          </NavLink>
        </div>
        <div
          className="slideshow"
          style={{ display: slideIndex === 2 ? "block" : "none" }}
        >
          <NavLink className="slideshow-navlink" to="/dramas/4">
            <div className="slideshow-number"> {slideIndex + 1} / 4</div>
            <img
              className="slideshow-gif"
              src={process.env.PUBLIC_URL + `/images/reply-1988.gif`}
              alt={`Slide ${slideIndex + 1}`}
            />
            <div className="slideshow-div">
              <div className="slideshow-caption">Reply 1988</div>
            </div>
          </NavLink>
        </div>
        <div
          className="slideshow"
          style={{ display: slideIndex === 3 ? "block" : "none" }}
        >
          <NavLink className="slideshow-navlink" to="/dramas/7">
            <div className="slideshow-number"> {slideIndex + 1} / 4</div>
            <img
              className="slideshow-gif"
              src={process.env.PUBLIC_URL + `/images/kill-me-heal-me.gif`}
              alt={`Slide ${slideIndex + 1}`}
            />
            <div className="slideshow-div">
              <div className="slideshow-caption">Kill Me Heal Me</div>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="landing-buttons">
        <NavLink to="/dramas" className="landing-dramas">
          <div className="landing-buttons-title">Check out our Dramas!</div>
          <img
            className="landing-img"
            src={process.env.PUBLIC_URL + "/images/tele.gif"}
          />
        </NavLink>
        <NavLink to="/actors" className="landing-actors">
          <div className="landing-buttons-title">Check out our Actors!</div>
          <img
            className="landing-img"
            src={process.env.PUBLIC_URL + "/images/actors.gif"}
          />
        </NavLink>
      </div>
    </div>
  );
}

export default LandingPage;
