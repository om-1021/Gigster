import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const [popular, setPopular] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (popular) navigate(`/gigs?cat=${popular}`);
    else navigate(`/gigs?search=${input}`);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const handlePopularClick = (popularValue) => {
    setInput(popularValue);
    if (popularValue == "Writing & Translation") setPopular("writing");
    else if (popularValue == "Design") setPopular("design");
    else if (popularValue == "Web Development") setPopular("web");
    else if (popularValue == "AI Services") setPopular("ai");
    else setPopular(NULL);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                value={input}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button
              onClick={() => handlePopularClick("Design")}
              style={{ cursor: "pointer" }}
            >
              Design
            </button>
            <button
              onClick={() => handlePopularClick("Writing & Translation")}
              style={{ cursor: "pointer" }}
            >
              Writing & Translation
            </button>
            <button
              onClick={() => handlePopularClick("Web Development")}
              style={{ cursor: "pointer" }}
            >
              Web Development
            </button>
            <button
              onClick={() => handlePopularClick("AI Services")}
              style={{ cursor: "pointer" }}
            >
              AI Services
            </button>
          </div>
        </div>
        <div className="right">{/* <img src="./img/man.png" alt="" /> */}</div>
      </div>
    </div>
  );
}

export default Featured;
