import { decrypt } from "@backend/conversation/utils"
import LumosRailsApi from "@backend/libs/LumosRailsApi"

async function scoresHandler(req, res) {

  const start = new Date().getTime() / 1000;

  await (new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 10001)
  }))

  const end = new Date().getTime() / 1000;

  res.status(200).json({ timeout: (end - start) })
}

export default scoresHandler
