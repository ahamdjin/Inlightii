import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import BlogPage from './BlogPage'
import ContactPage from './ContactPage'
import './styles.css'
import './pages.css'
import './hero-fix.css'
import './difference-enhancement.css'
import './difference-expand.css'
import './mobile.css'

function ChineseHomePage() {
  useEffect(() => {
    const journal = document.querySelector<HTMLAnchorElement>('.nav__links a[href="/blog"]')
    const contact = document.querySelector<HTMLAnchorElement>('.nav__contact')
    if (journal) journal.href = '/zh/blog'
    if (contact) contact.href = '/zh/contact'
  }, [])

  return <App language="zh" />
}

function Router() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/blog') return <BlogPage />
  if (path === '/contact') return <ContactPage />
  if (path === '/zh/blog') return <BlogPage language="zh" />
  if (path === '/zh/contact') return <ContactPage language="zh" />
  if (path === '/zh') return <ChineseHomePage />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
