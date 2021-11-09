class InteractiveUserStorage {
  async set<T>(key: string, props: T): Promise<T> {
    console.log('set!', key, props)
    await window.interactiveCanvas?.setUserParam(key, props)
    return props
  }

  async get<T>(key: string, fallback?: T | undefined): Promise<T | undefined> {
    try {
      const result = await window.interactiveCanvas?.getUserParam(key)
      return result as T
    } catch (error) {
      return fallback
    }
  }
}


export default InteractiveUserStorage
