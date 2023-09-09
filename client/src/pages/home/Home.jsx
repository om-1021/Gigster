import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <Featured />
      <Slide slidesToShow={3} arrowsScroll={3}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check-mark.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check-mark.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check-mark.png" alt="" />
              Protected payments, every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check-mark.png" alt="" />
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className="item">
            <video src="./img/video.mp4" controls />
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="container">
          <h1>Explore the marketplace</h1>
          <div className="items">
            <div className="item">
              <Link to="gigs?cat=design" style={{ textDecoration: "none" }}>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                  alt=""
                />
              </Link>
              <div className="line"></div>
              <Link to="gigs?cat=design" style={{ textDecoration: "none" }}>
                <span>Graphics & Design</span>
              </Link>
            </div>
            <div className="item">
              <Link to="gigs?cat=ai" style={{ textDecoration: "none" }}>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                  alt=""
                />
              </Link>
              <div className="line"></div>
              <Link to="gigs?cat=ai" style={{ textDecoration: "none" }}>
                <span>AI Services</span>
              </Link>
            </div>
            <div className="item">
              <Link to="gigs?cat=writing" style={{ textDecoration: "none" }}>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                  alt=""
                />
              </Link>
              <div className="line"></div>
              <Link to="gigs?cat=writing" style={{ textDecoration: "none" }}>
                <span>Writing & Translation</span>
              </Link>
            </div>
            <div className="item">
              <Link to="gigs?cat=animation" style={{ textDecoration: "none" }}>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                  alt=""
                />
              </Link>
              <div className="line"></div>
              <Link to="gigs?cat=animation" style={{ textDecoration: "none" }}>
                <span>Animation</span>
              </Link>
            </div>

            <div className="item">
              <Link to="gigs?cat=web" style={{ textDecoration: "none" }}>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                  alt=""
                />
              </Link>
              <div className="line"></div>
              <Link to="gigs?cat=web" style={{ textDecoration: "none" }}>
                <span>Web Development</span>
              </Link>
            </div>

            <div className="item">
              <Link
                to="gigs?cat=photography"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                  alt=""
                />
              </Link>
              <div className="line"></div>

              <Link
                to="gigs?cat=photography"
                style={{ textDecoration: "none" }}
              >
                <span>Photography</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="client-F">
        <h1>Client Favourites</h1>
        <Slide slidesToShow={4} arrowsScroll={4}>
          {projects.map((card) => (
            <ProjectCard key={card.id} card={card} />
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default Home;
