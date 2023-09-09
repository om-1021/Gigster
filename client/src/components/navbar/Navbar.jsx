import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Gigster</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.png"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link
              className="link menuLink"
              to="/gigs?cat=design"
              onClick={() => {
                refetch();
              }}
            >
              Design
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=animation"
              onClick={() => {
                refetch();
              }}
            >
              Animation
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=writing"
              onClick={() => {
                refetch();
              }}
            >
              Writing & Translation
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=ai"
              onClick={() => {
                refetch();
              }}
            >
              AI Services
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=web"
              onClick={() => {
                refetch();
              }}
            >
              Web Development
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=photography"
              onClick={() => {
                refetch();
              }}
            >
              Photography
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
