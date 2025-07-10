import type { UseMutationOptions, UseQueryOptionsProps } from '@/lib/hooks/type'

export type MutationOptionsType<T, B = unknown> = UseMutationOptions<T, B>
export type ParsianItRequestsProps<T> = Pick<MutationOptionsType<T>, 'onSuccess' | 'onError'> & {
  id?: number
}

export type QueryOptionsType<T> = UseQueryOptionsProps<T>
