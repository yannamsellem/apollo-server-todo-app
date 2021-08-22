import { Repository } from '../repositories'

declare global {
  interface Context {
    repository: Repository
  }
}
