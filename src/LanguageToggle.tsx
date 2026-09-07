import { useEffect } from 'react'

function getLanguageLinks(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/blog' || path === '/zh/blog') {
    return { en: '/blog', zh: '/zh/blog' }
  }

  if (path === '/contact' || path === '/zh/contact') {
    return { en: '/contact', zh: '/zh/contact' }
  }

  return { en: '/', zh: '/zh/' }
}

function LanguageToggle() {
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/'
    const isZh = path === '/zh' || path.startsWith('/zh/')
    const links = getLanguageLinks(path)
    const cleanups: Array<() => void> = []

    const buildToggle = (className: string) => {
      const toggle = document.createElement('span')
      toggle.className = className
      toggle.setAttribute('role', 'group')
      toggle.setAttribute('aria-label', isZh ? '语言选择' : 'Language selector')

      const en = document.createElement('a')
      en.href = links.en
      en.textContent = 'EN'
      en.className = !isZh ? 'is-active' : ''
      if (!isZh) en.setAttribute('aria-current', 'page')

      const divider = document.createElement('span')
      divider.className = 'language-toggle__divider'
      divider.textContent = '/'
      divider.setAttribute('aria-hidden', 'true')

      const zh = document.createElement('a')
      zh.href = links.zh
      zh.textContent = '中文'
      zh.className = isZh ? 'is-active' : ''
      if (isZh) zh.setAttribute('aria-current', 'page')

      toggle.append(en, divider, zh)
      return toggle
    }

    document.querySelectorAll<HTMLElement>('.nav__links, .page-nav nav').forEach((nav) => {
      const anchors = Array.from(nav.querySelectorAll<HTMLAnchorElement>(':scope > a'))
      const languageLink = anchors[anchors.length - 1]
      if (!languageLink || nav.querySelector(':scope > .language-toggle')) return

      languageLink.style.display = 'none'
      const toggle = buildToggle('language-toggle')
      nav.appendChild(toggle)

      cleanups.push(() => {
        toggle.remove()
        languageLink.style.display = ''
      })
    })

    const mobileBottom = document.querySelector<HTMLElement>('.mobile-menu__bottom')
    if (mobileBottom && !mobileBottom.querySelector('.mobile-menu__language')) {
      const oldLanguageLink = mobileBottom.querySelector<HTMLAnchorElement>(':scope > a:first-of-type')
      if (oldLanguageLink) {
        oldLanguageLink.style.display = 'none'
        const toggle = buildToggle('language-toggle mobile-menu__language')
        mobileBottom.insertBefore(toggle, oldLanguageLink)

        cleanups.push(() => {
          toggle.remove()
          oldLanguageLink.style.display = ''
        })
      }
    }

    return () => cleanups.reverse().forEach((cleanup) => cleanup())
  }, [])

  return null
}

export default LanguageToggle
