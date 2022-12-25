const generateJWT = require("../helpers/generateJWT")
const { areWeInProduction } = require("../utils/config")
const Person = require("../models/person")
const sendEmail = require("../helpers/mailer")

const codeGenerator = async (req, res) => {
  const { email } = req.params

  const isValidEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )

  const emailLower = email.toLowerCase()

  if (!isValidEmail) {
    res.status(400).json({ ok: false })
    return
  }

  const numbers = "0123456789"
  let randomCode = ""

  Array(6)
    .fill()
    .map(() => {
      const numberIndex = Math.round(Math.random() * 9, 0)
      randomCode = randomCode + numbers[numberIndex]
    })

  const person = await Person.findOne({ email: emailLower })

  if (!person) {
    res
      .status(403)
      .json({ ok: false, message: "No existe un usuario con ese correo" })
  } else {
    person.loginCode = randomCode
    await person.save()
  }

  try {
    const result = await sendEmail(
      emailLower,
      `Código para ingresar: ${randomCode}`,
      `
        <!DOCTYPE html>
          <html lang='en'>
            <head>
              <meta charset='UTF-8' />
              <meta name='viewport' content='width=device-width, initial-scale=1.0' />
              <link
                href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
                rel='stylesheet'
              />
              <style type='text/css'>
                body {
                  width: 100%;
                  font-family: 'Roboto', sans-serif;
                  width: 300px;
                  border-radius: 20px;
                }
    
                /* Forces Hotmail to display emails at full width */
                  .ExternalClass {
                    width: 100%;
                  }
              
                .flex {
                  display: -webkit-flex;
                  display: -ms-flexbox;
                  display: flex;
                  align-items: center;
                  margin-bottom: 0.5rem;
                  margin-top: 1.3rem;
                }
    
                p {
                  margin: 0;
                }
              </style>
            </head>
            <body>
                <p style="font-size: 1.3rem;">Para iniciar sesión ingresa el siguiente código de 6 dígitos:</p>
                </br>
    
                <div style="display: flex; align-items: center; width: 100% !important;">
                <span style="margin-right: 0.5rem; padding-bottom: 0.2rem; margin-bottom: 0.2rem; font-size: 1.1rem; line-height: 1.7rem;">&#9989;</span>
                <span style="color: #333; font-size: 1.5rem; line-height: 1.8rem; font-weight: bold;"> ${randomCode}</span> 
                </div>
            </body>
          </html>
    
      `
    )
    res.status(200).json({ ok: true })
  } catch (error) {
    console.log({ error })
  }
}

const localCallback = async (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  console.log("LOCAL CALLBACK!")
  const user = req.user

  let token = generateJWT({ user })

  res.cookie("jwt", token, {
    secure: areWeInProduction,
    sameSite: areWeInProduction ? "None" : "strict",
  })

  res.status(200).json({ ok: true, data: token })
}

module.exports = {
  localCallback,
  codeGenerator,
}
