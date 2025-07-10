import { axiosInstance } from '@/lib'
import { request } from '@/lib/services/request'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'
import type { UseMutationOptions } from './type'

export function createMutationHook(method: 'post' | 'put' | 'patch') {
  return function useCustomMutation<T, B = unknown, E = unknown>({
    url,
    key,
    headers,
    id,
    onError,
    onSuccess,
  }: UseMutationOptions<T, E>) {
    return useMutation<AxiosResponse<T>, AxiosError<E>, B>({
      mutationKey: [key, id],
      mutationFn: (body) => request<T, B>(axiosInstance, method, url, body, headers),
      onSuccess: onSuccess,
      onError: onError,
    })
  }
}
