import { axiosInstance } from '@/lib'
import { fetchData } from '@/lib/services/request'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'
import { useId } from 'react'
import type { UseQueryOptionsProps } from './type'

export function createQueryHook() {
  return function useCustomQuery<T, E = unknown>({
    url,
    key,
    options,
    headers,
    id,
  }: UseQueryOptionsProps<T, E>) {
    const _id = useId()
    id = id || _id
    return useQuery<AxiosResponse<T>, AxiosError<E>>({
      queryKey: Array.isArray(key) ? [key, id] : [key],
      queryFn: () => fetchData<T>(axiosInstance, url, headers),
      ...options,
    })
  }
}

export function createSuspenseQueryHook() {
  return function useCustomQuery<T, E = unknown>({
    url,
    key,
    options,
    headers,
    id,
  }: UseQueryOptionsProps<T, E>) {
    const _id = useId()
    id = id || _id
    return useSuspenseQuery<AxiosResponse<T>, AxiosError<E>>({
      queryKey: Array.isArray(key) ? [key, id] : [key],
      queryFn: () => fetchData<T>(axiosInstance, url, headers),
      ...options,
    })
  }
}
