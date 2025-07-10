import ToasterComponent from '@/components/common/toaster/ToasterComponent'

import ReactQueryProvider from '@/components/providers/ReactQueryProvider'

import type { PropsWithChildren } from 'react'

type WrappedProvidersProps = PropsWithChildren
const WrappedProviders = ({ children }: WrappedProvidersProps) => {
  return (
    <>
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <ToasterComponent />
    </>
  )
}

export default WrappedProviders
