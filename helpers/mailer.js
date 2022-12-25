const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "mgesualdo@equip-arte.com", // generated ethereal user
    pass: "Gesu1625!",
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
})

const sendEmail = async (to, subject, html, bcc) => {
  try {
    const result = await transporter.sendMail({
      from: `Equiparte <mgesualdo@equip-arte.com>`, // sender address
      to, // list of receivers
      bcc,
      subject, // Subject line
      html, // html body
    })
    console.log({ result })
    return { ok: true, message: "Excelente, mail enviado con éxito!" }
  } catch (error) {
    console.log({ error })
    return {
      ok: false,
      message: "Hubo un problema al enviar el email",
      err,
    }
  }
}

module.exports = sendEmail
