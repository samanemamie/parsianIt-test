import { getErrorMessage } from '@/lib'
import {
  keepPreviousData,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { type PropsWithChildren, useState } from 'react'
import { toast } from 'sonner'

type ReactQueryProviderProps = PropsWithChildren

export default function ReactQueryProvider(props: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof AxiosError) {
              getErrorMessage(error)?.forEach((item) => {
                toast[item.flag]?.(item.message)
              })
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (error instanceof AxiosError) {
              getErrorMessage(error)?.forEach((item) => {
                toast[item.flag]?.(item.message)
              })
            }
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
            placeholderData: keepPreviousData,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {props.children}
    </QueryClientProvider>
  )
}
