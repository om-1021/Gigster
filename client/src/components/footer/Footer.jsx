import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="containerFooter">
        <div className="top">
          <h2 className="category-heading">Categories</h2>
          <div className="category-list">
            <span>Design</span>
            <span>Animation</span>
            <span>Writing & Translation</span>
            <span>AI Services</span>
            <span>Web Development</span>
            <span>Photography</span>
          </div>
          <hr className="divider" />
        </div>

        <div className="bottom">
          <div className="social-icons">
            <img src="/img/twitter.png" alt="Twitter" />
            <img src="/img/instagram.png" alt="Instagram" />
            <img src="/img/linkedin.png" alt="LinkedIn" />
            <img src="/img/meta.png" alt="Facebook" />
          </div>
          <div className="bottomD">
            <div className="bottom-logo">Gigster</div>
            <span className="copyright">© Gigster International Ltd. 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
