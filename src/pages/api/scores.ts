import { decrypt } from "@backend/conversation/utils"
import LumosRailsApi from "@backend/libs/LumosRailsApi"

async function scoresHandler(req, res) {
  if (req.method !== 'POST') {
    res.status(404).json({
      status: 404
    })
    return
  }

  if ((!req.body.token) || (!req.body.slug) || (!req.body.eventData)) {
    res.status(400).json({
      status: 400
    })
    return
  }

  const { slug, eventData } = req.body
  const token = await decrypt(req.body.token)
  const result = await (new LumosRailsApi()).saveGameResult(token, slug, eventData)
  res.status(200).json({ result })
}

export default scoresHandler
