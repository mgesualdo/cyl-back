const generateJWT = require("../helpers/generateJWT")

const refreshToken = (req, res) => {
  const user = req.user

  let token = generateJWT({ user })

  res.status(200).json({ ok: true, data: token })
}

const codeVerification = async (req, res) => {
  const { code } = req.params
  const { email } = req.body

  const validCode = await User.exists({ email, loginCode: code })

  if (validCode) {
    res.status(200).json({ ok: true })
  } else {
    res
      .status(200)
      .json({ ok: false, message: "El código ingresado no es válido." })
  }
}
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

  const user = await User.findOne({ email: emailLower })

  if (!user) {
    const createdUser = await User.create({
      firstname: "",
      lastname: "",
      fullname: "",
      email: emailLower,
      emailVerified: false,
      hasEverLoggedIn: false,
      loginCode: randomCode,
    })

    // Hacemos que arranque con una "no-user-image.png", sobre todo para poder inicializar bien su wallet
    const { data: userImageBuffer } = await axios({
      method: "GET",
      url: `${config.blobsBaseUrl}/wallets/user-no-image.png`,

      headers: {
        "Content-Type": "application/json",
      },
      // Sino terminaba devolviendo como string codificado en UTF8 y fallaba
      // https://stackoverflow.com/questions/66807052/utf-8-encoded-string-to-buffer-node-js
      responseType: "arraybuffer",
    })

    console.log({ userImageBuffer })

    const blobName = await updateBlob({
      buffer: userImageBuffer,
      folderName: "usersprofileimage",
      fileName: createdUser._id,
    })

    createdUser.pictureUrl = `${config.blobsBaseUrl}/${blobName}`
    await createdUser.save()
  } else {
    user.loginCode = randomCode
    await user.save()
  }

  try {
    await sendEmail(
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
    logger.error("error al enviar código", {
      err: error,
      path: req?.originalUrl,
      body: req?.body,
      params: req?.params,
      query: req?.query,
    })
  }
}

const localCallback = async (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  console.log("LOCAL CALLBACK!")
  const user = req.user

  let token = generateJWT({ user })

  res.cookie("jwt", token, { secure: false })

  res.status(200).json({ ok: true, data: token })
}

module.exports = {
  localCallback,
  codeGenerator,
  codeVerification,
}
