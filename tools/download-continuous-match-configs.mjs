import YAML from 'yaml'
import fs from 'fs'
import axios from 'axios'

const games = fs.readdirSync('./config-data/games/')


for (let i = 0; i < games.length; i++) {
  const game = JSON.parse(fs.readFileSync(`./config-data/games/${games[i]}`))
  if (!game || !game.values?.continuous_match_configs) {
    console.log(`skipped for game #${i}`)
    continue
  }
  const downloaded = await Promise.all(game.values?.continuous_match_configs.map((url) => {
    return axios.get(url, { responseType: 'blob' })
  }))


  const result = downloaded.reduce((accumulator, yaml) => {
    const parsed = YAML.parse(yaml.data)
    if (parsed?.expected_phrases)
      return accumulator.concat(parsed?.expected_phrases)
    return accumulator
  }, [])

  console.log(`downloaded for ${game.id}`)
  console.log(JSON.stringify(result))
  fs.writeFileSync(`./config-data/continuous_match_configs/${game.id}.json`, JSON.stringify(result))
}

