import WrappedProviders from '@/components/providers/index.ts'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <WrappedProviders>
    <App />
  </WrappedProviders>
)
