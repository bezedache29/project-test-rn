export interface Todo {
  id: string
  title: string
  done: boolean
  /** Date ISO : reste une chaîne pour survivre à l'aller-retour JSON dans MMKV. */
  createdAt: string
}
