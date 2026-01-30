




const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");

// SendGrid API key should already be set in server.js
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/send-email", async (req, res) => {
  console.log("📩 Incoming email payload:", req.body);

  // Debug logs
  console.log("📩 Sending email from:", process.env.SENDGRID_FROM_EMAIL);
  console.log("📩 Template ID:", process.env.SENDGRID_TEMPLATE_ID);

  try {
    const { caregiverEmail, caregiverName, patientName, medicineName, scheduledTime, date } = req.body;

    await sgMail.send({
      to: caregiverEmail,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL, // ✅ this is your verified sender
        name: "MediAssist Alerts",
      },
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      dynamicTemplateData: {
        caretakerName: caregiverName,
        patientName,
        medicineName,
        time: scheduledTime,
        date,
      },
    });

    res.status(200).json({ message: "📧 Missed dose email sent" });
  } catch (error) {
    console.error("❌ SendGrid error:", error.response?.body || error);
    res.status(500).json({
      error: "Failed to send email",
      details: error.response?.body,
    });
  }
});

module.exports = router;

