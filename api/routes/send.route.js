// Import necessary modules
import express from "express";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();
// Set SendGrid API key
sgMail.setApiKey(process.env.SG_API_KEY);

let generatedOTP = ""; // Store OTP in memory

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


router.post("/send-email", async (req, res) => {
  try {
    generatedOTP = generateOTP(); // Generate OTP
    const message = {
      to: req.body.to,
      from: "omdubey1021@gmail.com",
      subject: "OTP Verification",
      text: `Your OTP is: ${generatedOTP}`,
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"> <div style="margin:50px auto;width:70%;padding:20px 0"> <div style="border-bottom:1px solid #eee"> <a href="" style="font-size:1.4em;color: #FF4533;text-decoration:none;font-weight:600">Gigster</a> </div> <p style="font-size:1.1em">Hi,</p> <p>Thank you for choosing Gigster. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p> <h2 style="background: #FF4533;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 10px;">${generatedOTP}</h2> <p style="font-size:0.9em;">Regards,<br />Gigster</p> <hr style="border:none;border-top:1px solid #eee" /> <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"> <p>Gigster Pvt Ltd.</p> <p>WhiterField Bengaluru</p> <p>Karnatka</p> </div> </div></div>`,
    };

    await sgMail.send(message);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

router.post("/verify-otp", (req, res) => {
  const enteredOTP = req.body.otp;

  if (enteredOTP === generatedOTP) {
    res.status(200).json({ message: "OTP verification successful" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

// Export the router
export default router;
