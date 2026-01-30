export interface MissedDoseEmailParams {
  caregiverEmail: string;
  caregiverName: string;
  patientName: string;
  medicineName: string;
  scheduledTime: string;
  date: string;
}

export const sendMissedDoseEmail = async (
  params: MissedDoseEmailParams
) => {
  try {
    const response = await fetch("http://localhost:5000/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caregiverEmail: params.caregiverEmail,
        caregiverName: params.caregiverName,
        patientName: params.patientName,
        medicineName: params.medicineName,
        scheduledTime: params.scheduledTime,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to send email");
    }

    console.log("📧 Missed dose email sent");
  } catch (error) {
    console.error("❌ Failed to send missed dose email", error);
  }
};
