import { useEffect, useState } from 'react'

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const isZh = path === '/zh' || path.startsWith('/zh/')
  const base = isZh ? '/zh' : ''

  const labels = isZh
    ? { company: '关于我们', gallery: '项目', capabilities: '能力', journal: '日志', contact: '联系', language: 'EN', menu: '菜单', close: '关闭' }
    : { company: 'Company', gallery: 'Gallery', capabilities: 'Capabilities', journal: 'Journal', contact: 'Contact', language: '中文', menu: 'Menu', close: 'Close' }

  const languageHref = isZh
    ? path === '/zh/blog' ? '/blog' : path === '/zh/contact' ? '/contact' : '/'
    : path === '/blog' ? '/zh/blog' : path === '/contact' ? '/zh/contact' : '/zh/'

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
      <button
        className="mobile-menu__button"
        type="button"
        aria-label={open ? labels.close : labels.menu}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="mobile-menu__panel" aria-hidden={!open}>
        <div className="mobile-menu__wash" aria-hidden="true" />
        <div className="mobile-menu__top">
          <span>INLIGHT International</span>
          <span>{isZh ? '设计 · 工程 · 制造' : 'Design · Engineering · Manufacturing'}</span>
        </div>

        <nav className="mobile-menu__links" aria-label={labels.menu}>
          <a href={`${base}/#difference`} onClick={close}><span>01</span>{labels.company}</a>
          <a href={`${base}/#work`} onClick={close}><span>02</span>{labels.gallery}</a>
          <a href={`${base}/#process`} onClick={close}><span>03</span>{labels.capabilities}</a>
          <a href={`${base}/blog`} onClick={close}><span>04</span>{labels.journal}</a>
          <a href={`${base}/contact`} onClick={close}><span>05</span>{labels.contact}</a>
        </nav>

        <div className="mobile-menu__bottom">
          <a href={languageHref}>{labels.language}</a>
          <a href="mailto:info@inlightii.com">info@inlightii.com</a>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
