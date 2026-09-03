import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import BlogPage from './BlogPage'
import ContactPage from './ContactPage'
import './styles.css'
import './pages.css'

function HomePage() {
  useEffect(() => {
    const centerNav = document.querySelector('.nav__links')
    const contactLink = document.querySelector<HTMLAnchorElement>('.nav__contact')

    if (centerNav && !centerNav.querySelector('[data-journal-link]')) {
      const journalLink = document.createElement('a')
      journalLink.href = '/blog'
      journalLink.textContent = 'Journal'
      journalLink.setAttribute('data-journal-link', 'true')
      centerNav.appendChild(journalLink)
    }

    if (contactLink) contactLink.href = '/contact'
  }, [])

  return <App />
}

function Router() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/blog') return <BlogPage />
  if (path === '/contact') return <ContactPage />
  return <HomePage />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
