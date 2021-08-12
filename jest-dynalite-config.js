import fs from 'fs'

const nest_game_runs = JSON.parse(fs.readFileSync('tools/tables/nest_game_runs.json'))
nest_game_runs.TableName = 'test_' + nest_game_runs.TableName

module.exports = {
  tables: [
    nest_game_runs
  ],
  basePort: 8005,
}
