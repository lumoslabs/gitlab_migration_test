import { GameConfig } from '@backend/services/ConfigService'

const games: GameConfig[] = [
  {
    "type": "game",
    "id": "color-match-nest",
    "name": "color-match-nest",
    "values": {
      "slug": "color-match-nest",
      "id": 1,
      "title": "Color Match",
      "path": "color-match-nest",
      "brain_area": "FLEXIBILITY",
      "banner_url": "https://assets.nest.lumosity.com/frontend_assets/banner/color_match_header.png",
      "score_thumbnail_url": "https://assets.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_color_match.png",
      "invoke_file": "game.js",
      "frontend_data": {
        "score_description_key": "colorMatchSummaryDescription",
        "scores": [
          {
            "screens": [
              "score"
            ],
            "score_screen_score_key": "scoreScreenCards",
            "run_data_references": {
              "num_correct": {
                "key": "game_result_data.num_correct",
                "default": 0
              }
            }
          }
        ]
      },
      "versions": [],
      "last_version": {
        "id": "nest_1.0",
        "overrides": {
          "game_url": "https://assets.nest.lumosity.com/game-assets/ColorMatch_CC/nest_lowres/a213a4c63155fa5fde7fbe266d42654a33b71a56/289067450/release/",
          "extras": {
            "skip_title": true,
            "skip_stats": true
          }
        }
      }
    }
  },
  {
    "type": "game",
    "id": "ebb-and-flow-nest",
    "name": "ebb-and-flow-nest",
    "values": {
      "slug": "ebb-and-flow-nest",
      "id": 2,
      "title": "Ebb and Flow",
      "path": "ebb-and-flow-nest",
      "brain_area": "FLEXIBILITY",
      "banner_url": "https://assets.nest.lumosity.com/frontend_assets/banner/ebb_and_flow_header.png",
      "score_thumbnail_url": "https://assets.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_ebb_and_flow.png",
      "invoke_file": "game.js",
      "frontend_data": {
        "score_description_key": "ebbAndFlowSummaryDescription",
        "scores": [
          {
            "screens": [
              "score"
            ],
            "score_screen_score_key": "scoreScreenLeaves",
            "run_data_references": {
              "num_correct": {
                "key": "game_result_data.num_correct",
                "default": 0
              }
            }
          }
        ]
      },
      "versions": [],
      "last_version": {
        "id": "nest_1.0",
        "overrides": {
          "game_url": "https://assets.nest.lumosity.com/game-assets/EbbAndFlow_CC/nest_lowres/cd95f718b77a7320a74542238f9bf8895faac790/289522478/release/",
          "extras": {
            "skip_title": true,
            "skip_stats": true
          }
        }
      }
    }
  },
  {
    "type": "game",
    "id": "raindrops-nest",
    "name": "raindrops-nest",
    "values": {
      "slug": "raindrops-nest",
      "id": 3,
      "title": "Raindrops",
      "path": "raindrops-nest",
      "brain_area": "MATH",
      "banner_url": "https://assets.nest.lumosity.com/frontend_assets/banner/raindrops_header.png",
      "score_thumbnail_url": "https://assets.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_raindrops.png",
      "invoke_file": "game.js",
      "frontend_data": {
        "score_description_key": "raindropsSummaryDescription",
        "scores": [
          {
            "screens": [
              "score"
            ],
            "score_screen_score_key": "scoreScreenCorrect",
            "run_data_references": {
              "num_correct": {
                "key": "game_result_data.num_correct",
                "default": 0
              }
            }
          }
        ]
      },
      "versions": [],
      "last_version": {
        "id": "nest_1.0",
        "overrides": {
          "game_url": "https://assets.nest.lumosity.com/game-assets/Raindrops_CC/nest_lowres/3bea7a3244b88385fa8aef44f9484770f1a6d924/289602258/release/",
          "extras": {
            "skip_title": true,
            "skip_stats": true
          }
        }
      }
    }
  },
  {
    "type": "game",
    "id": "train-of-thought-nest",
    "name": "train-of-thought-nest",
    "values": {
      "slug": "train-of-thought-nest",
      "id": 4,
      "title": "Train of Thought",
      "path": "train-of-thought-nest",
      "brain_area": "ATTENTION",
      "banner_url": "https://assets.nest.lumosity.com/frontend_assets/banner/train_of_thought_header.png",
      "score_thumbnail_url": "https://assets.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_train_of_thought.png",
      "invoke_file": "game.js",
      "frontend_data": {
        "score_description_key": "trainOfThoughtSummaryDescription",
        "scores": [
          {
            "screens": [
              "score"
            ],
            "score_screen_score_key": "scoreScreenTrains",
            "run_data_references": {
              "num_correct": {
                "key": "game_result_data.num_correct",
                "default": 0
              }
            }
          }
        ]
      },
      "versions": [],
      "last_version": {
        "id": "nest_1.0",
        "overrides": {
          "game_url": "https://assets.nest.lumosity.com/game-assets/TrainOfThought_CC/nest_lowres/43a41021888c93d6b1fe1401ca0459f4655f2df3/289057183/release/",
          "extras": {
            "skip_title": true,
            "skip_stats": true
          }
        }
      }
    }
  },
  {
    "type": "game",
    "id": "word-snatchers-nest",
    "name": "word-snatchers-nest",
    "values": {
      "slug": "word-snatchers-nest",
      "id": 5,
      "title": "Word Snatchers",
      "path": "word-snatchers-nest",
      "brain_area": "LANGUAGE",
      "banner_url": "https://assets.nest.lumosity.com/frontend_assets/banner/word_snatchers_header.png",
      "score_thumbnail_url": "https://assets.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_word_snatchers.png",
      "invoke_file": "game.js",
      "frontend_data": {
        "score_description_key": "wordSnatchersSummaryDescription",
        "scores": [
          {
            "screens": [
              "score"
            ],
            "score_screen_score_key": "scoreScreenLetters",
            "run_data_references": {
              "max_letters": {
                "key": "game_result_data.max_letters",
                "default": 0
              }
            }
          }
        ]
      },
      "versions": [],
      "last_version": {
        "id": "nest_1.0",
        "overrides": {
          "game_url": "https://assets.nest.lumosity.com/game-assets/WordSnatchers_CC/nest_lowres/65db28a8e7fa8b8bf3ea2a2a6c67ac6533956258/289509235/release/",
          "extras": {
            "skip_title": true,
            "skip_stats": true
          }
        }
      }
    }
  }
]

export default games
