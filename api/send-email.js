import nodemailer from "nodemailer";
//pit-8bc64ece-b67b-4e76-bce9-0e500137f246
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, phone, email, propertyType, productsNeeded, projectType } =
    req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔹 Admin Email (YOU receive)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: "🚀 New Lead from Website",
      html: `
        <h2>New Lead Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email || "Not provided"}</p>
        <p><b>Property:</b> ${propertyType}</p>
        <p><b>Products:</b> ${productsNeeded.join(", ")}</p>
        <p><b>Project:</b> ${projectType}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ error: "Email failed" });
  }
}
