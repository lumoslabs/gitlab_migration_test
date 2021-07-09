import fs from 'fs'

const nest_configs = JSON.parse(fs.readFileSync('tools/tables/nest_configs.json'))
nest_configs.TableName = 'test_' + nest_configs.TableName

const nest_game_runs = JSON.parse(fs.readFileSync('tools/tables/nest_game_runs.json'))
nest_game_runs.TableName = 'test_' + nest_game_runs.TableName

module.exports = {
  tables: [
    nest_configs,
    nest_game_runs
  ],
  basePort: 8005,
};
