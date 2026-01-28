import fs from "node:fs"
import path from "node:path"
import fetch from "node-fetch"

const LICENSE_SERVER_URL = "https://masqr.gointerstellar.app/validate"
const Fail = fs.readFileSync("Failed.html", "utf8")

export function setupMasqr(app) {
  app.use(async (req, res, next) => {
    if (req.url.includes("/ca/")) {
      next()
      return
    }

    const authheader = req.headers.authorization

    if (req.cookies["authcheck"]) {
      next()
      return
    }

    if (req.cookies["refreshcheck"] !== "true") {
      res.cookie("refreshcheck", "true", { maxAge: 10000 })
      MasqFail(req, res)
      return
    }

    if (!authheader) {
      res.setHeader("WWW-Authenticate", "Basic")
      res.status(401)
      MasqFail(req, res)
      return
    }

    const auth = Buffer.from(authheader.split(" ")[1], "base64").toString().split(":")
    const pass = auth[1]

    try {
      const licenseCheckResponse = await fetch(LICENSE_SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ license: pass, host: req.headers.host }),
      })
      const licenseCheck = (await licenseCheckResponse.json())["status"]
      console.log(
        `License validation for host ${req.headers.host} returned: ${licenseCheck}`
      )
      if (licenseCheck === "License valid") {
        res.cookie("authcheck", "true", {
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        })
        res.send("<script> window.location.href = window.location.href </script>")
        return
      }

      MasqFail(req, res)
    } catch (error) {
      console.error(error)
      MasqFail(req, res)
    }
  })
}

async function MasqFail(req, res) {
  if (!req.headers.host) {
    return
  }
  const masqrDir = path.resolve(process.cwd(), "Masqrd")
  const requestedFile = req.headers.host + ".html"
  const safeJoin = path.resolve(masqrDir, requestedFile)
  
  if (!safeJoin.startsWith(masqrDir)) {
    res.setHeader("Content-Type", "text/html")
    res.send(Fail)
    return
  }
  
  try {
    await fs.promises.access(safeJoin)
    const FailLocal = await fs.promises.readFile(safeJoin, "utf8")
    res.setHeader("Content-Type", "text/html")
    res.send(FailLocal)
  } catch (e) {
    res.setHeader("Content-Type", "text/html")
    res.send(Fail)
  }
}
