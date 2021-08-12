export interface Config {
  name: string;
  id: string;
  type: string;
  values: any;
}

export interface GameConfigVersion {
  id: string;
  overrides: {
    extras: Record<string, string | boolean>,
    game_url: string
  }
}

export interface FrontEndData {
  score_description_key: string;
  scores: {
    score_screen_score_key: string;
    screens: any;
    run_data_references: any;
  }[]
}

export interface GameConfig extends Config {
  values: {
    id: number;
    slug: string;
    brain_area: string;
    continuous_match_configs: string[];
    frontend_data: FrontEndData;
    invoke_file: string;
    title: string;
    score_thumbnail_url: string;
    path: string;
    versions: GameConfigVersion[];
    banner_url: string;
    last_version: GameConfigVersion;
  }
}

export interface CMMPhrase {
  "phrase": string,
  "alternative_phrases": string[]
}

export default class CatalogService {

  async getFile<T>(fileName: string): Promise<T> {
    const module = await import(`../../../config-data/${fileName}.json`)
    return module.default
  }

  async getCatalogGames() {
    const catalog = await this.getFile<{ slug: string }[]>('catalog')
    const games = (await Promise.all(catalog?.map((game) => {
      return this.getCatalogGameBySlug(game.slug)
    }))).sort((a, b) => (a?.values?.title > b?.values?.title) ? 1 : -1)
    return games
  }

  async getCatalogGameBySlug(slug: string) {
    const game: Omit<GameConfig, "last_version"> | null = await this.getFile<GameConfig>(`games/${slug}`)
    return game ? {
      ...game,
      values: {
        ...game.values,
        last_version: game?.values?.versions[game?.values?.versions?.length - 1]
      }
    } as GameConfig : null
  }

  async getGameContinuousMatchPhrases(slug: string) {
    return await this.getFile<CMMPhrase[]>(`continuous_match_configs/${slug}`)
  }

  async getVoiceGameMap() {
    return await this.getFile<Record<string, string>>(`catalog_voice_map`)
  }
}

