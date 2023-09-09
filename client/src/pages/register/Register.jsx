import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });
  const [enteredOTP, setEnteredOTP] = useState(""); // State for entered OTP
  const [verificationStatus, setVerificationStatus] = useState(false); // State for verification status

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);

    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSendEmail = async () => {
    try {
      await newRequest.post("/send/send-email", {
        to: user.email,
        enteredOTP: enteredOTP, // Include the entered OTP
      });
      console.log("Email sent successfully");
      setVerificationStatus(false); // Reset verification status
    } catch (error) {
      console.error("Error sending email", error);
    }
  };
  // const verifyOTP = async () => {
  //   try {
  //     const response = await newRequest.post("/send/verify-otp", {
  //       otp: enteredOTP,
  //     });

  //     if (response.status === 200) {
  //       setVerificationStatus("verified");
  //     } else {
  //       setVerificationStatus("wrong otp");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setVerificationStatus("wrong otp");
  //   }
  // };
  const verifyOTP = async () => {
    try {
      const response = await newRequest.post("/send/verify-otp", {
        otp: enteredOTP,
      });

      if (response.status === 200) {
        setVerificationStatus("verified");
        document
          .querySelector('input[name="otp"]')
          .classList.add("no-error-border");
      } else {
        setVerificationStatus("wrong otp");

        // Add this line to add a red border to the input field
        document
          .querySelector('input[name="otp"]')
          .classList.add("error-border");
      }
    } catch (err) {
      console.error(err);
      setVerificationStatus("wrong otp");

      // Add this line to add a red border to the input field
      document.querySelector('input[name="otp"]').classList.add("error-border");
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input name="username" type="text" onChange={handleChange} />
          <label htmlFor="">Email</label>
          <input name="email" type="email" onChange={handleChange} />
          <button type="button" onClick={handleSendEmail}>
            Send Otp
          </button>
          <label htmlFor="">Otp</label>
          <input
            name="otp"
            type="number"
            onChange={(e) => setEnteredOTP(e.target.value)}
          />

          <button
            type="button"
            onClick={verifyOTP}
            className={
              verificationStatus === "verified"
                ? "verified-button" // Define a CSS class for verified button style
                : ""
            }
          >
            {verificationStatus === "verified"
              ? "Verified"
              : verificationStatus === "wrong otp"
              ? "Wrong Otp"
              : "Verify"}
          </button>
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input name="country" type="text" onChange={handleChange} />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input name="phone" type="text" onChange={handleChange} />
          <label htmlFor="">Description</label>
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
