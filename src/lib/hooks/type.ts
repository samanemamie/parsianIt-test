import type { UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError, AxiosHeaders, AxiosResponse } from 'axios'

export interface UseQueryOptionsProps<T, E = unknown> {
  url: string
  key: string | readonly unknown[]
  options?: Omit<UseQueryOptions<AxiosResponse<T>, AxiosError<E>>, 'queryKey' | 'queryFn'>
  headers?: AxiosHeaders
  id?: number | string
}

export interface UseMutationOptions<T, E = unknown> {
  url: string
  key: string
  onSuccess?: (data: AxiosResponse<T>) => void
  onError?: (error: AxiosError<E>) => void
  id?: number
  headers?: AxiosHeaders
}
