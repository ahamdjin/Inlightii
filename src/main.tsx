import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import BlogPage from './BlogPage'
import ContactPage from './ContactPage'
import './styles.css'
import './pages.css'
import './hero-fix.css'
import './difference-enhancement.css'
import './difference-expand.css'

function Router() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/blog') return <BlogPage />
  if (path === '/contact') return <ContactPage />
  if (path === '/zh') return <App language="zh" />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
