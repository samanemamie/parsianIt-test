import type { MutationOptionsType, ParsianItRequestsProps } from './type'

class ParsianITReadRequests {}

class ParsianItWriteRequests {
  Form_Post = <T>({ onError, onSuccess }: ParsianItRequestsProps<T>): MutationOptionsType<T> => {
    return {
      url: 'https://jsonplaceholder.typicode.com/posts',
      key: 'add-form',
      onSuccess: onSuccess,
      onError: onError,
    }
  }
}
const requestRead = new ParsianITReadRequests()
const requestWrite = new ParsianItWriteRequests()

export { requestRead, requestWrite }
